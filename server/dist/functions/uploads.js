"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPFSURLs = exports.uploadMetadataToIPFS = void 0;
const crypto_1 = require("crypto");
const uploadToIpfs_1 = require("../utils/functions/uploadToIpfs");
const uploadMetadataToIPFS = async (ipMetadata, nftMetadata, options = {}) => {
    const { ipfsGateway = 'https://ipfs.io/ipfs/', validateBeforeUpload = true } = options;
    if (validateBeforeUpload) {
        // Validate IP metadata
        if (!ipMetadata.title || !ipMetadata.description || !ipMetadata.creators?.length) {
            throw new Error('Invalid IP metadata: missing required fields');
        }
        // Validate NFT metadata
        if (!nftMetadata.name || !nftMetadata.description || !nftMetadata.attributes?.length) {
            throw new Error('Invalid NFT metadata: missing required fields');
        }
    }
    try {
        // Upload IP metadata to IPFS
        const ipIpfsHash = await (0, uploadToIpfs_1.uploadJSONToIPFS)(ipMetadata);
        const ipHash = (0, crypto_1.createHash)('sha256')
            .update(JSON.stringify(ipMetadata))
            .digest('hex');
        // Upload NFT metadata to IPFS
        const nftIpfsHash = await (0, uploadToIpfs_1.uploadJSONToIPFS)(nftMetadata);
        const nftHash = (0, crypto_1.createHash)('sha256')
            .update(JSON.stringify(nftMetadata))
            .digest('hex');
        return {
            ipIpfsHash,
            ipHash,
            nftIpfsHash,
            nftHash,
        };
    }
    catch (error) {
        throw new Error(`Failed to upload metadata to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.uploadMetadataToIPFS = uploadMetadataToIPFS;
const getIPFSURLs = (uploadResult, ipfsGateway = 'https://ipfs.io/ipfs/') => {
    return {
        ipMetadataURI: `${ipfsGateway}${uploadResult.ipIpfsHash}`,
        ipMetadataHash: `0x${uploadResult.ipHash}`,
        nftMetadataURI: `${ipfsGateway}${uploadResult.nftIpfsHash}`,
        nftMetadataHash: `0x${uploadResult.nftHash}`,
    };
};
exports.getIPFSURLs = getIPFSURLs;
