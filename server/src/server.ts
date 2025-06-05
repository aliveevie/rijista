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

// See: https://docs.yakoa.io/reference/register-token for schema and field requirements
yakoaIpApi.auth('8wdFsbEpsE5vJjKy1eHSI6PYn1jzsvmPa5ge11mW');
yakoaIpApi.tokenTokenPost({
  id: '0x8a90cab2b38dba80c64b7734e58ee1db38b8982e',
  registration_tx: {
    hash: '0x2473a96855e8625c5c4b643962a3905e029aaf9a55aefc882ad90bf623931570', // 64 hex chars, no 0x prefix
    block_number: 13435576,
    timestamp: '2021-10-17T01:00:19Z'
  },
  creator_id: '0x2b3ab8e7bb14988616359b78709538b10900ab7d',
  metadata: { name: 'Doodle #42' },
  media: [
    {
      media_id: 'ipfs_image',
      url: 'https://ipfs.io/ipfs/QmQTkvAKhrTCmSR24zQgDLUiUT6gqWqh9aZJDbX5yWgLMP',
      hash: '2bfeb6d726ea350b7e8984e7f4ee86cedfc90cf58ac60f2579968ad852e62825',
      trust_reason: null
    },
    {
      media_id: 'trusted_image',
      url: 'https://www.nike.com/favicon.ico',
      hash: 'c0ccf2af3b5a4b3c81727a5cc79a0d8d99529e70c9dabb9824bf9b7bf8daf96a',
      trust_reason: { type: 'trusted_platform', platform_name: 'Magma' }
    }
  ],
  license_parents: null,
  authorizations: null
})
  .then(({ data }) => console.log('Yakoa IP API Token Registration Response:', data))
  .catch(err => {
    if (err && err.data) {
      console.error('Error registering token with Yakoa IP API:', err.data);
      if (err.data.extra) {
        console.error('Yakoa IP API error details (extra):', JSON.stringify(err.data.extra, null, 2));
      }
    } else {
      console.error('Error registering token with Yakoa IP API:', err);
    }
  });

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
    const { registrationId } = req.body;

    if (!registrationId) {
      throw new Error('Registration ID is required for Yakoa protection');
    }

    // Get the stored registration data
    const storedData = registrationStore.get(registrationId);
    if (!storedData?.ipMetadata || !storedData?.nftMetadata || !storedData?.uploadResult) {
      throw new Error('Registration data not found. Please complete IP registration first.');
    }

    const { ipMetadata, nftMetadata, uploadResult } = storedData;

    // Prepare media array according to Yakoa API schema
    const media = [
      {
        media_id: 'ip_asset_image',
        url: ipMetadata.image,
        hash: null, // Hash should be computed from the actual image
        trust_reason: {
          type: 'trusted_platform' as const,
          platform_name: 'Story Protocol'
        }
      }
    ];

    // Add media URL if it exists
    if (ipMetadata.mediaUrl) {
      media.push({
        media_id: 'ip_asset_media',
        url: ipMetadata.mediaUrl,
        hash: null,
        trust_reason: {
          type: 'trusted_platform' as const,
          platform_name: 'Story Protocol'
        }
      });
    }

    // Add animation URL if it exists
    if (nftMetadata.animation_url) {
      media.push({
        media_id: 'ip_asset_animation',
        url: nftMetadata.animation_url,
        hash: null,
        trust_reason: {
          type: 'trusted_platform' as const,
          platform_name: 'Story Protocol'
        }
      });
    }

    // Prepare license data if available
    const licenseParents = uploadResult.licenseTermsIds ? 
      uploadResult.licenseTermsIds.map((id: string) => ({
        parent_id: uploadResult.ipaId,
        license_id: id
      })) : null;

    // Register token with Yakoa using the exact schema
    const yakoaResponse = await yakoaIpApi.tokenTokenPost({
      id: uploadResult.ipaId,
      registration_tx: {
        hash: uploadResult.transactionHash.replace('0x', ''), // Remove 0x prefix as per schema
        block_number: uploadResult.blockNumber || 0,
        timestamp: uploadResult.timestamp || new Date().toISOString()
      },
      creator_id: ipMetadata.creators[0].address,
      metadata: {
        name: ipMetadata.title,
        description: ipMetadata.description,
        created_at: ipMetadata.createdAt,
        media_type: ipMetadata.mediaType,
        nft_name: nftMetadata.name,
        nft_description: nftMetadata.description,
        attributes: nftMetadata.attributes || []
      },
      media,
      license_parents: licenseParents,
      authorizations: null
    });

    // Log successful registration with detailed data
    console.log('Yakoa IP Protection Response:', {
      tokenId: yakoaResponse.data.id,
      ipMetadata: {
        title: ipMetadata.title,
        description: ipMetadata.description,
        creators: ipMetadata.creators
      },
      media: media.map(m => ({ id: m.media_id, url: m.url })),
      licenses: licenseParents,
      timestamp: new Date().toISOString()
    });

    // Update stored data to include Yakoa protection status
    registrationStore.set(registrationId, {
      ...storedData,
      yakoaProtection: {
        tokenId: yakoaResponse.data.id,
        protectedAt: new Date().toISOString(),
        infringements: yakoaResponse.data.infringements
      }
    });

    return res.json({
      success: true,
      data: {
        message: 'IP successfully protected with Yakoa',
        yakoaTokenId: yakoaResponse.data.id,
        protectedAt: new Date().toISOString(),
        metadata: {
          title: ipMetadata.title,
          description: ipMetadata.description,
          mediaCount: media.length,
          licenseCount: licenseParents?.length || 0
        },
        infringements: yakoaResponse.data.infringements
      }
    });
  } catch (error) {
    console.error('Yakoa protection error:', error);
    
    // Handle Yakoa API specific errors with detailed logging
    if (error && (error as any).data) {
      console.error('Yakoa API error details:', {
        error: (error as any).data,
        registrationId: req.body.registrationId,
        timestamp: new Date().toISOString()
      });
      
      if ((error as any).data.extra) {
        console.error('Yakoa API error details (extra):', JSON.stringify((error as any).data.extra, null, 2));
      }
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