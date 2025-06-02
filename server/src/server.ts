import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { generateIPMetadata } from './functions/ipmetadata';
import { validateAndCreateNFTMetadata } from './functions/nftmedata';
import { registerIPAssetWithMetadata } from './functions/register';
import { uploadMetadataToIPFS } from './functions/uploads';

// Load environment variables
dotenv.config();

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

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 