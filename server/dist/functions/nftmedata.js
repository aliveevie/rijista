"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndCreateNFTMetadata = exports.generateNFTMetadata = void 0;
const generateNFTMetadata = (input) => {
    return {
        name: input.name,
        description: input.description,
        image: input.image,
        animation_url: input.animation_url,
        attributes: input.attributes,
    };
};
exports.generateNFTMetadata = generateNFTMetadata;
// Example usage with validation
const validateAndCreateNFTMetadata = (input) => {
    const requiredFields = [
        'name',
        'description',
        'image',
        'animation_url',
        'attributes'
    ];
    const missingFields = requiredFields.filter(field => !input[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    // Validate URLs
    if (!input.image?.startsWith('http')) {
        throw new Error('Image URL must be a valid HTTP(S) URL');
    }
    if (!input.animation_url?.startsWith('http')) {
        throw new Error('Animation URL must be a valid HTTP(S) URL');
    }
    // Validate attributes
    if (!input.attributes?.length) {
        throw new Error('At least one attribute is required');
    }
    input.attributes.forEach(attr => {
        if (!attr.key || !attr.value) {
            throw new Error('Each attribute must have both a key and value');
        }
    });
    return (0, exports.generateNFTMetadata)(input);
};
exports.validateAndCreateNFTMetadata = validateAndCreateNFTMetadata;
