"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const ipmetadata_1 = require("./functions/ipmetadata");
const nftmedata_1 = require("./functions/nftmedata");
const register_1 = require("./functions/register");
const uploads_1 = require("./functions/uploads");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8083;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Store registration data temporarily (in production, use a proper database)
const registrationStore = new Map();
// Helper function to handle BigInt serialization
const serializeBigInt = (obj) => {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    if (Array.isArray(obj)) {
        return obj.map(serializeBigInt);
    }
    if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = serializeBigInt(value);
        }
        return result;
    }
    return obj;
};
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Story Protocol API Server' });
});
// Registration endpoint
app.post('/api/register', async (req, res) => {
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
                const ipMetadata = await (0, ipmetadata_1.generateIPMetadata)({
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
                const nftMetadata = await (0, nftmedata_1.validateAndCreateNFTMetadata)({
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
                const uploadResult = await (0, uploads_1.uploadMetadataToIPFS)(storedData.ipMetadata, storedData.nftMetadata, { validateBeforeUpload: true });
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
                const registrationResult = await (0, register_1.registerIPAssetWithMetadata)(storedData.ipMetadata, storedData.nftMetadata, {
                    defaultMintingFee: 1,
                    commercialRevShare: 5,
                    waitForTransaction: true
                });
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
    }
    catch (error) {
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
