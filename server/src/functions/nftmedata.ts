export interface NFTAttribute {
    key: string
    value: string
}

export interface NFTMetadataInput {
    name: string
    description: string
    image: string
    animation_url: string
    attributes: NFTAttribute[]
}

export interface NFTMetadata extends NFTMetadataInput {}

export const generateNFTMetadata = (input: NFTMetadataInput): NFTMetadata => {
    return {
        name: input.name,
        description: input.description,
        image: input.image,
        animation_url: input.animation_url,
        attributes: input.attributes,
    }
}

// Example usage with validation
export const validateAndCreateNFTMetadata = (input: Partial<NFTMetadataInput>): NFTMetadata => {
    const requiredFields: (keyof NFTMetadataInput)[] = [
        'name',
        'description',
        'image',
        'animation_url',
        'attributes'
    ];

    const missingFields = requiredFields.filter(field => !input[field]);
    if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.map(field => {
            switch (field) {
                case 'name': return 'NFT Name';
                case 'description': return 'NFT Description';
                case 'image': return 'NFT Image URL';
                case 'animation_url': return 'Animation URL';
                case 'attributes': return 'NFT Attributes';
                default: return field;
            }
        }).join(', ')}`);
    }

    // Validate URLs
    if (!input.image?.startsWith('http')) {
        throw new Error('Please provide a valid HTTP(S) URL for the NFT image');
    }

    if (!input.animation_url?.startsWith('http')) {
        throw new Error('Please provide a valid HTTP(S) URL for the animation');
    }

    // Validate attributes
    if (!input.attributes?.length) {
        throw new Error('Please add at least one attribute to your NFT');
    }

    const invalidAttributes = input.attributes.filter(attr => !attr.key || !attr.value);
    if (invalidAttributes.length > 0) {
        const invalidIndexes = invalidAttributes.map((_, index) => index + 1).join(', ');
        throw new Error(`Please provide both a key and value for attribute(s) at position(s): ${invalidIndexes}`);
    }

    return generateNFTMetadata(input as NFTMetadataInput);
}
