"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIPAssetWithMetadata = exports.registerIPAsset = void 0;
const config_1 = require("../utils/config");
const utils_1 = require("../utils/utils");
const uploads_1 = require("./uploads");
const registerIPAsset = async (ipMetadata, nftMetadata, uploadResult, options = {}) => {
    const { defaultMintingFee = 1, commercialRevShare = 5, spgNftContract = utils_1.SPGNFTContractAddress, waitForTransaction = true, ipfsGateway = 'https://ipfs.io/ipfs/' } = options;
    try {
        const ipfsUrls = (0, uploads_1.getIPFSURLs)(uploadResult, ipfsGateway);
        const response = await config_1.client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
            spgNftContract: spgNftContract,
            licenseTermsData: [
                {
                    terms: (0, utils_1.createCommercialRemixTerms)({
                        defaultMintingFee,
                        commercialRevShare,
                    }),
                },
            ],
            ipMetadata: {
                ipMetadataURI: ipfsUrls.ipMetadataURI,
                ipMetadataHash: ipfsUrls.ipMetadataHash,
                nftMetadataURI: ipfsUrls.nftMetadataURI,
                nftMetadataHash: ipfsUrls.nftMetadataHash,
            },
            txOptions: { waitForTransaction },
        });
        if (!response.txHash || !response.ipId || !response.licenseTermsIds) {
            throw new Error('Missing required response data');
        }
        return {
            success: true,
            data: {
                'Transaction Hash': response.txHash,
                'IPA ID': response.ipId,
                'License Terms IDs': response.licenseTermsIds,
                'Explorer URL': `${config_1.networkInfo.protocolExplorer}/ipa/${response.ipId}`,
            },
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
};
exports.registerIPAsset = registerIPAsset;
// Example usage function that combines all steps
const registerIPAssetWithMetadata = async (ipMetadata, nftMetadata, options = {}) => {
    try {
        const { uploadMetadataToIPFS } = await Promise.resolve().then(() => __importStar(require('./uploads')));
        const { uploadOptions, ...registrationOptions } = options;
        const uploadResult = await uploadMetadataToIPFS(ipMetadata, nftMetadata, { validateBeforeUpload: uploadOptions?.validateBeforeUpload });
        return await (0, exports.registerIPAsset)(ipMetadata, nftMetadata, uploadResult, registrationOptions);
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
};
exports.registerIPAssetWithMetadata = registerIPAssetWithMetadata;
