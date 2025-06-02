import { createCommercialRemixTerms, SPGNFTContractAddress } from '../../utils/utils'
import { client, networkInfo } from '../../utils/config'
import { uploadJSONToIPFS } from '../../utils/functions/uploadToIpfs'
import { createHash } from 'crypto'
import { IpMetadata } from '@story-protocol/core-sdk'

interface IPAssetMetadata {
    title: string;
    description: string;
    creators: Array<{
        name: string;
        address: string;
        contributionPercent: number;
    }>;
    image: string;
    mediaUrl: string;
    mediaType: string;
    attributes: Array<{ key: string; value: string; }>;
}

export const registerIPAsset = async function (metadata: IPAssetMetadata) {
    try {
        // 1. Set up your IP Metadata
        //
        // Docs: https://docs.story.foundation/concepts/ip-asset/ipa-metadata-standard
        const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
            title: metadata.title,
            description: metadata.description,
            createdAt: Math.floor(Date.now() / 1000).toString(),
            creators: metadata.creators,
            image: metadata.image,
            imageHash: createHash('sha256').update(metadata.image).digest('hex'),
            mediaUrl: metadata.mediaUrl,
            mediaHash: createHash('sha256').update(metadata.mediaUrl).digest('hex'),
            mediaType: metadata.mediaType,
        })

        // 2. Set up your NFT Metadata
        //
        // Docs: https://docs.opensea.io/docs/metadata-standards#metadata-structure
        const nftMetadata = {
            name: metadata.title,
            description: metadata.description,
            image: metadata.image,
            animation_url: metadata.mediaUrl,
            attributes: metadata.attributes,
        }

        // 3. Upload your IP and NFT Metadata to IPFS
        const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
        const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
        const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
        const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

        // 4. Register the NFT as an IP Asset
        //
        // Docs: https://docs.story.foundation/sdk-reference/ip-asset#mintandregisterip
        const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
            spgNftContract: SPGNFTContractAddress,
            licenseTermsData: [
                {
                    terms: createCommercialRemixTerms({ defaultMintingFee: 1, commercialRevShare: 5 }),
                },
            ],
            ipMetadata: {
                ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
                ipMetadataHash: `0x${ipHash}`,
                nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
                nftMetadataHash: `0x${nftHash}`,
            },
            txOptions: { waitForTransaction: true },
        })

        return {
            success: true,
            data: {
                'Transaction Hash': response.txHash,
                'IPA ID': response.ipId,
                'License Terms IDs': response.licenseTermsIds,
                'Explorer URL': `${networkInfo.protocolExplorer}/ipa/${response.ipId}`
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    // Example metadata for direct execution
    const exampleMetadata: IPAssetMetadata = {
        title: 'Midnight Marriage',
        description: 'This is a house-style song generated on suno.',
        creators: [{
            name: 'Jacob Tucker',
            address: '0xA2f9Cf1E40D7b03aB81e34BC50f0A8c67B4e9112',
            contributionPercent: 100,
        }],
        image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
        mediaUrl: 'https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3',
        mediaType: 'audio/mpeg',
        attributes: [
            {
                key: 'Suno Artist',
                value: 'amazedneurofunk956',
            },
            {
                key: 'Artist ID',
                value: '4123743b-8ba6-4028-a965-75b79a3ad424',
            },
            {
                key: 'Source',
                value: 'Suno.com',
            },
        ],
    };
    
    registerIPAsset(exampleMetadata).then(console.log).catch(console.error);
}
