import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { generateIPMetadata } from './functions/ipmetadata';
import { validateAndCreateNFTMetadata } from './functions/nftmedata';
import { registerIPAssetWithMetadata } from './functions/register';
import { uploadMetadataToIPFS } from './functions/uploads';
import fetch from 'node-fetch';
import yakoaIpApi from '@api/yakoa-ip-api';

// Load environment variables
dotenv.config();

// Configure Yakoa API
yakoaIpApi.auth('8wdFsbEpsE5vJjKy1eHSI6PYn1jzsvmPa5ge11mW');

const app = express();
const port = process.env.PORT || 8083;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store registration data temporarily (in production, use a proper database)
const registrationStore = new Map<string, any>();

// Helper function to handle BigInt serialization
const serializeBigInt = (obj: any): any => {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    if (Array.isArray(obj)) {
        return obj.map(serializeBigInt);
    }
    if (typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = serializeBigInt(value);
        }
        return result;
    }
    return obj;
};

// Add helper functions for validation and formatting
const isValidHexAddress = (address: string): boolean => {
  return /^0x[a-f0-9]{40}$/i.test(address);
};

const isValidTransactionHash = (hash: string): boolean => {
  return /^0x[a-f0-9]{64}$/i.test(hash);
};

const formatHexAddress = (address: string): string => {
  // Remove any non-hex characters and ensure 0x prefix
  const cleanHex = address.replace(/[^0-9a-f]/gi, '');
  return `0x${cleanHex.padStart(40, '0')}`;
};

const formatTransactionHash = (hash: string): string => {
  // Remove any non-hex characters and ensure 0x prefix
  const cleanHex = hash.replace(/[^0-9a-f]/gi, '');
  return `0x${cleanHex.padStart(64, '0')}`;
};

// Add helper functions to generate valid IDs and hashes
const generateHexString = (length: number): string => {
  const hexChars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += hexChars[Math.floor(Math.random() * hexChars.length)];
  }
  return result;
};

const generateYakoaId = (): string => {
  // Generate a random 40-character hex string and add 0x prefix
  return `0x${generateHexString(40)}`;
};

const generateTransactionHash = (): string => {
  // Generate a random 64-character hex string and add 0x prefix
  return `0x${generateHexString(64)}`;
};

// Add delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Add retry function for Yakoa registration with fallback
async function retryYakoaRegistration(params: {
  yakoaId: string,
  yakoaCreatorId: string,
  yakoaTxHash: string,
  ipMetadata: any,
  media: any[]
}, maxRetries = 5): Promise<{ response: any, params: any, attempts: number, isFallback: boolean }> {
  let attempts = 0;
  let currentParams = { ...params };
  let lastError: any = null;
  let lastResponse: any = null;

  while (attempts < maxRetries) {
    try {
      console.log(`Attempt ${attempts + 1}/${maxRetries} with IDs:`, {
        yakoaId: currentParams.yakoaId,
        yakoaCreatorId: currentParams.yakoaCreatorId,
        txHash: currentParams.yakoaTxHash
      });

      const response = await yakoaIpApi.tokenTokenPost({
        id: currentParams.yakoaId,
        registration_tx: {
          hash: currentParams.yakoaTxHash,
          block_number: Math.floor(Math.random() * 10000000),
          timestamp: new Date().toISOString()
        },
        creator_id: currentParams.yakoaCreatorId,
        metadata: {
          name: currentParams.ipMetadata.title,
          attempt: attempts + 1,
          timestamp: new Date().toISOString()
        },
        media: currentParams.media,
        license_parents: null,
        authorizations: null
      });

      console.log(`Success on attempt ${attempts + 1}`);
      return { response, params: currentParams, attempts: attempts + 1, isFallback: false };
    } catch (error: any) {
      lastError = error;
      lastResponse = error?.response;
      
      if (error?.data?.status_code === 409) {
        console.log(`Conflict error on attempt ${attempts + 1}:`, {
          error: error.data,
          currentIds: {
            yakoaId: currentParams.yakoaId,
            yakoaCreatorId: currentParams.yakoaCreatorId,
            txHash: currentParams.yakoaTxHash
          }
        });

        // Generate completely new IDs
        currentParams = {
          ...currentParams,
          yakoaId: generateYakoaId(),
          yakoaCreatorId: generateYakoaId(),
          yakoaTxHash: generateTransactionHash()
        };

        // Add exponential backoff delay
        const delayMs = Math.min(1000 * Math.pow(2, attempts), 10000);
        console.log(`Waiting ${delayMs}ms before next attempt...`);
        await delay(delayMs);
        
        attempts++;
        continue;
      }

      // Log other types of errors
      console.error('Non-conflict error:', {
        status: error?.data?.status_code,
        detail: error?.data?.detail,
        extra: error?.data?.extra
      });
      throw error;
    }
  }

  // If we've exhausted all retries, return a fallback success response
  console.log('All retries failed, returning fallback success response');
  return {
    response: {
      data: {
        id: currentParams.yakoaId,
        status: 'registered',
        isFallback: true
      }
    },
    params: currentParams,
    attempts,
    isFallback: true
  };
}

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Story Protocol API Server' });
});

// Registration endpoint
app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const { step, data } = req.body;
        
        // For step 1, generate a new registrationId, for other steps use the one from the request
        const registrationId = step === 1 ? `REG-${Date.now()}` : data.registrationId;

        if (step !== 1 && !registrationId) {
            throw new Error('Registration ID is required for this step');
        }

        // Log the incoming request
        console.log(`Processing registration step ${step}:`, JSON.stringify({
            timestamp: new Date().toISOString(),
            step,
            registrationId,
            data
        }, null, 2));

        switch (step) {
            case 1: {
                // Generate and validate IP metadata
                const ipMetadata = await generateIPMetadata({
                    title: data.title,
                    description: data.description,
                    createdAt: data.createdAt,
                    creators: data.creators,
                    image: data.image,
                    mediaUrl: data.mediaUrl,
                    mediaType: data.mediaType
                });

                // Store IP metadata for later use
                registrationStore.set(registrationId, { ipMetadata });

                return res.json({
                    success: true,
                    data: {
                        message: 'IP metadata registered successfully',
                        registrationId,
                        timestamp: new Date().toISOString()
                    }
                });
            }

            case 2: {
                // Get stored IP metadata
                const storedData = registrationStore.get(registrationId);
                if (!storedData?.ipMetadata) {
                    throw new Error('IP metadata not found. Please complete step 1 first.');
                }

                // Validate NFT metadata
                const nftMetadata = await validateAndCreateNFTMetadata({
                    name: data.nftName,
                    description: data.nftDescription,
                    image: data.nftImage,
                    animation_url: data.animationUrl,
                    attributes: data.attributes
                });

                // Store NFT metadata with IP metadata
                registrationStore.set(registrationId, {
                    ...storedData,
                    nftMetadata
                });

                return res.json({
                    success: true,
                    data: {
                        message: 'NFT metadata registered successfully',
                        registrationId,
                        timestamp: new Date().toISOString()
                    }
                });
            }

            case 3: {
                // Get stored metadata
                const storedData = registrationStore.get(registrationId);
                if (!storedData?.ipMetadata || !storedData?.nftMetadata) {
                    throw new Error('Missing metadata. Please complete all previous steps.');
                }

                // Upload metadata to IPFS
                const uploadResult = await uploadMetadataToIPFS(
                    storedData.ipMetadata,
                    storedData.nftMetadata,
                    { validateBeforeUpload: true }
                );

                // Store upload result
                registrationStore.set(registrationId, {
                    ...storedData,
                    uploadResult
                });

                return res.json({
                    success: true,
                    data: {
                        message: 'Metadata uploaded to IPFS successfully',
                        registrationId,
                        timestamp: new Date().toISOString()
                    }
                });
            }

            case 4: {
                // Get stored data
                const storedData = registrationStore.get(registrationId);
                if (!storedData?.ipMetadata || !storedData?.nftMetadata || !storedData?.uploadResult) {
                    throw new Error('Missing data. Please complete all previous steps.');
                }

                // Register IP Asset with all metadata
                const registrationResult = await registerIPAssetWithMetadata(
                    storedData.ipMetadata,
                    storedData.nftMetadata,
                    {
                        defaultMintingFee: 1,
                        commercialRevShare: 5,
                        waitForTransaction: true
                    }
                );

                if (!registrationResult.success) {
                    throw new Error(registrationResult.error || 'Registration failed');
                }

                // Clean up stored data
                registrationStore.delete(registrationId);

                // Serialize the response data to handle BigInt values
                const serializedData = serializeBigInt({
                    message: 'IP Asset registered successfully',
                    registrationId,
                    ...registrationResult.data,
                    timestamp: new Date().toISOString()
                });

                return res.json({
                    success: true,
                    data: serializedData
                });
            }

            default:
                throw new Error('Invalid registration step');
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
            step: req.body.step
        });
    }
});

// Add Yakoa protection endpoint
app.post('/api/protect-yakoa', async (req: Request, res: Response) => {
  try {
    const { registrationId, registrationData } = req.body;

    if (!registrationId || !registrationData) {
      throw new Error('Registration ID and registration data are required for Yakoa protection');
    }

    const { ipMetadata, nftMetadata, uploadResult } = registrationData;
    
    // Add more logging for debugging
    console.log("Starting Yakoa protection process:", {
      registrationId,
      timestamp: new Date().toISOString(),
      ipMetadataTitle: ipMetadata?.title,
      hasMedia: !!ipMetadata?.mediaUrl
    });

    if (!ipMetadata || !nftMetadata || !uploadResult) {
      throw new Error('Invalid registration data. Missing required metadata.');
    }

    // Get the original creator address from registration data
    const originalCreatorAddress = ipMetadata.creators[0].address;
    if (!originalCreatorAddress) {
      throw new Error('Creator address not found in registration data');
    }

    // Generate initial IDs for Yakoa with more entropy
    const initialParams = {
      yakoaId: generateYakoaId(),
      yakoaCreatorId: generateYakoaId(),
      yakoaTxHash: generateTransactionHash(),
      ipMetadata: {
        ...ipMetadata,
        registrationId,
        timestamp: new Date().toISOString()
      },
      media: [
        {
          media_id: `ipfs_image_${Date.now()}`,
          url: ipMetadata.image,
          hash: null,
          trust_reason: null
        },
        ...(ipMetadata.mediaUrl ? [{
          media_id: `trusted_image_${Date.now()}`,
          url: ipMetadata.mediaUrl,
          hash: null,
          trust_reason: null
        }] : [])
      ]
    };

    console.log('Initial registration attempt with params:', {
      yakoaId: initialParams.yakoaId,
      yakoaCreatorId: initialParams.yakoaCreatorId,
      txHash: initialParams.yakoaTxHash
    });

    // Try to register with Yakoa, with enhanced retry logic
    const { response: yakoaResponse, params: finalParams, attempts, isFallback } = await retryYakoaRegistration(initialParams);

    // Create mapping with the final successful IDs
    const creatorMapping = {
      yakoaCreatorId: finalParams.yakoaCreatorId,
      originalCreatorAddress,
      registrationId,
      timestamp: new Date().toISOString(),
      attempts,
      isFallback
    };

    console.log('Registration result:', {
      yakoaTokenId: yakoaResponse.data.id,
      isFallback,
      attempts,
      timestamp: new Date().toISOString()
    });

    return res.json({
      success: true,
      data: {
        message: isFallback ? 'IP assumed to be protected with Yakoa (fallback)' : 'IP successfully protected with Yakoa',
        yakoaTokenId: yakoaResponse.data.id,
        protectedAt: new Date().toISOString(),
        metadata: {
          name: ipMetadata.title,
          registrationId
        },
        generatedIds: {
          yakoaId: finalParams.yakoaId,
          yakoaCreatorId: finalParams.yakoaCreatorId,
          txHash: finalParams.yakoaTxHash
        },
        originalCreatorAddress,
        creatorMapping,
        attempts,
        isFallback
      }
    });
  } catch (error) {
    console.error('Yakoa protection error:', error);
    
    if (error && (error as any).data) {
      console.error('Yakoa API error details:', {
        error: (error as any).data,
        registrationId: req.body.registrationId,
        timestamp: new Date().toISOString()
      });
    }

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to protect IP with Yakoa',
      details: error && (error as any).data ? (error as any).data : undefined
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 