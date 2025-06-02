import { createHash } from 'crypto'
import { uploadJSONToIPFS } from '../../utils/functions/uploadToIpfs'
import { IpMetadata } from '@story-protocol/core-sdk'
import { NFTMetadata } from './nftmedata'

export interface UploadResult {
    ipIpfsHash: string
    ipHash: string
    nftIpfsHash: string
    nftHash: string
}

export interface UploadOptions {
    ipfsGateway?: string
    validateBeforeUpload?: boolean
}

export const uploadMetadataToIPFS = async (
    ipMetadata: IpMetadata,
    nftMetadata: NFTMetadata,
    options: UploadOptions = {}
): Promise<UploadResult> => {
    const { ipfsGateway = 'https://ipfs.io/ipfs/', validateBeforeUpload = true } = options

    if (validateBeforeUpload) {
        // Validate IP metadata
        if (!ipMetadata.title || !ipMetadata.description || !ipMetadata.creators?.length) {
            throw new Error('Invalid IP metadata: missing required fields')
        }

        // Validate NFT metadata
        if (!nftMetadata.name || !nftMetadata.description || !nftMetadata.attributes?.length) {
            throw new Error('Invalid NFT metadata: missing required fields')
        }
    }

    try {
        // Upload IP metadata to IPFS
        const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
        const ipHash = createHash('sha256')
            .update(JSON.stringify(ipMetadata))
            .digest('hex')

        // Upload NFT metadata to IPFS
        const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
        const nftHash = createHash('sha256')
            .update(JSON.stringify(nftMetadata))
            .digest('hex')

        return {
            ipIpfsHash,
            ipHash,
            nftIpfsHash,
            nftHash,
        }
    } catch (error) {
        throw new Error(`Failed to upload metadata to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

export const getIPFSURLs = (uploadResult: UploadResult, ipfsGateway: string = 'https://ipfs.io/ipfs/') => {
    return {
        ipMetadataURI: `${ipfsGateway}${uploadResult.ipIpfsHash}`,
        ipMetadataHash: `0x${uploadResult.ipHash}`,
        nftMetadataURI: `${ipfsGateway}${uploadResult.nftIpfsHash}`,
        nftMetadataHash: `0x${uploadResult.nftHash}`,
    }
}
