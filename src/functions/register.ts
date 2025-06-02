import { client, networkInfo } from '../../utils/config'
import { createCommercialRemixTerms, SPGNFTContractAddress } from '../../utils/utils'
import { IpMetadata } from '@story-protocol/core-sdk'
import { NFTMetadata } from './nftmedata'
import { UploadResult, getIPFSURLs } from './uploads'

export interface RegistrationOptions {
    defaultMintingFee?: number
    commercialRevShare?: number
    spgNftContract?: `0x${string}`
    waitForTransaction?: boolean
    ipfsGateway?: string
}

export interface RegistrationResult {
    success: boolean
    data?: {
        'Transaction Hash': string
        'IPA ID': string
        'License Terms IDs': bigint[]
        'Explorer URL': string
    }
    error?: string
}

export const registerIPAsset = async (
    ipMetadata: IpMetadata,
    nftMetadata: NFTMetadata,
    uploadResult: UploadResult,
    options: RegistrationOptions = {}
): Promise<RegistrationResult> => {
    const {
        defaultMintingFee = 1,
        commercialRevShare = 5,
        spgNftContract = SPGNFTContractAddress as `0x${string}`,
        waitForTransaction = true,
        ipfsGateway = 'https://ipfs.io/ipfs/'
    } = options

    try {
        const ipfsUrls = getIPFSURLs(uploadResult, ipfsGateway)

        const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
            spgNftContract: spgNftContract as `0x${string}`,
            licenseTermsData: [
                {
                    terms: createCommercialRemixTerms({
                        defaultMintingFee,
                        commercialRevShare,
                    }),
                },
            ],
            ipMetadata: {
                ipMetadataURI: ipfsUrls.ipMetadataURI,
                ipMetadataHash: ipfsUrls.ipMetadataHash as `0x${string}`,
                nftMetadataURI: ipfsUrls.nftMetadataURI,
                nftMetadataHash: ipfsUrls.nftMetadataHash as `0x${string}`,
            },
            txOptions: { waitForTransaction },
        })

        if (!response.txHash || !response.ipId || !response.licenseTermsIds) {
            throw new Error('Missing required response data')
        }

        return {
            success: true,
            data: {
                'Transaction Hash': response.txHash,
                'IPA ID': response.ipId,
                'License Terms IDs': response.licenseTermsIds,
                'Explorer URL': `${networkInfo.protocolExplorer}/ipa/${response.ipId}`,
            },
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        }
    }
}

// Example usage function that combines all steps
export const registerIPAssetWithMetadata = async (
    ipMetadata: IpMetadata,
    nftMetadata: NFTMetadata,
    options: RegistrationOptions & { uploadOptions?: { validateBeforeUpload?: boolean } } = {}
): Promise<RegistrationResult> => {
    try {
        const { uploadMetadataToIPFS } = await import('./uploads')
        const { uploadOptions, ...registrationOptions } = options
        
        const uploadResult = await uploadMetadataToIPFS(
            ipMetadata,
            nftMetadata,
            { validateBeforeUpload: uploadOptions?.validateBeforeUpload }
        )
        
        return await registerIPAsset(
            ipMetadata,
            nftMetadata,
            uploadResult,
            registrationOptions
        )
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        }
    }
}
