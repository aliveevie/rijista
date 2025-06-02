import { IpMetadata, IpCreator } from '@story-protocol/core-sdk'
import { client } from '../../utils/config'
import { createHash } from 'crypto'

export interface Creator {
    name: string
    address: `0x${string}`
    contributionPercent: number
}

export interface IPMetadataInput {
    title: string
    description: string
    createdAt: string
    creators: Creator[]
    image: string
    imageHash: `0x${string}`
    mediaUrl: string
    mediaHash: `0x${string}`
    mediaType: string
}

const generateHash = (url: string): `0x${string}` => {
    const hash = createHash('sha256').update(url).digest('hex');
    return `0x${hash}` as `0x${string}`;
};

export const generateIPMetadata = ({
    title,
    description,
    createdAt,
    creators,
    image,
    mediaUrl,
    mediaType
}: {
    title: string
    description: string
    createdAt: string
    creators: {
        name: string
        address: `0x${string}`
        contributionPercent: number
    }[]
    image: string
    mediaUrl: string
    mediaType: string
}): IpMetadata => {
    const ipCreators: IpCreator[] = creators.map(creator => ({
        name: creator.name,
        address: creator.address,
        contributionPercent: creator.contributionPercent
    }))

    // Generate hashes for image and media
    const imageHash = generateHash(image);
    const mediaHash = generateHash(mediaUrl);

    return client.ipAsset.generateIpMetadata({
        title,
        description,
        createdAt,
        creators: ipCreators,
        image,
        imageHash,
        mediaUrl,
        mediaHash,
        mediaType,
    })
}

// Example usage with validation
export const validateAndCreateIPMetadata = (input: Partial<IPMetadataInput>): IpMetadata => {
    const requiredFields: (keyof IPMetadataInput)[] = [
        'title',
        'description',
        'createdAt',
        'creators',
        'image',
        'mediaUrl',
        'mediaType'
    ]

    const missingFields = requiredFields.filter(field => !input[field])
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    // Validate creators
    if (!input.creators?.length) {
        throw new Error('At least one creator is required')
    }

    // Validate address format
    input.creators.forEach(creator => {
        if (!creator.address.startsWith('0x')) {
            throw new Error(`Invalid address format for creator ${creator.name}`)
        }
    })

    return generateIPMetadata(input as Omit<IPMetadataInput, 'imageHash' | 'mediaHash'>)
}

// Example usage:
export const createDefaultIPMetadata = (): IpMetadata => {
    return generateIPMetadata({
        title: 'Midnight Marriage',
        description: 'This is a house-style song generated on suno.',
        createdAt: '1740005219',
        creators: [
            {
                name: 'Jacob Tucker',
                address: '0xA2f9Cf1E40D7b03aB81e34BC50f0A8c67B4e9112' as `0x${string}`,
                contributionPercent: 100,
            },
        ],
        image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
        mediaUrl: 'https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3',
        mediaType: 'audio/mpeg',
    })
}
