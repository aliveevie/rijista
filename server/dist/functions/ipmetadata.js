"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultIPMetadata = exports.validateAndCreateIPMetadata = exports.generateIPMetadata = void 0;
const config_1 = require("../utils/config");
const crypto_1 = require("crypto");
const generateHash = (url) => {
    const hash = (0, crypto_1.createHash)('sha256').update(url).digest('hex');
    return `0x${hash}`;
};
const generateIPMetadata = ({ title, description, createdAt, creators, image, mediaUrl, mediaType }) => {
    const ipCreators = creators.map(creator => ({
        name: creator.name,
        address: creator.address,
        contributionPercent: creator.contributionPercent
    }));
    // Generate hashes for image and media
    const imageHash = generateHash(image);
    const mediaHash = generateHash(mediaUrl);
    return config_1.client.ipAsset.generateIpMetadata({
        title,
        description,
        createdAt,
        creators: ipCreators,
        image,
        imageHash,
        mediaUrl,
        mediaHash,
        mediaType,
    });
};
exports.generateIPMetadata = generateIPMetadata;
// Example usage with validation
const validateAndCreateIPMetadata = (input) => {
    const requiredFields = [
        'title',
        'description',
        'createdAt',
        'creators',
        'image',
        'mediaUrl',
        'mediaType'
    ];
    const missingFields = requiredFields.filter(field => !input[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    // Validate creators
    if (!input.creators?.length) {
        throw new Error('At least one creator is required');
    }
    // Validate address format
    input.creators.forEach(creator => {
        if (!creator.address.startsWith('0x')) {
            throw new Error(`Invalid address format for creator ${creator.name}`);
        }
    });
    return (0, exports.generateIPMetadata)(input);
};
exports.validateAndCreateIPMetadata = validateAndCreateIPMetadata;
// Example usage:
const createDefaultIPMetadata = () => {
    return (0, exports.generateIPMetadata)({
        title: 'Midnight Marriage',
        description: 'This is a house-style song generated on suno.',
        createdAt: '1740005219',
        creators: [
            {
                name: 'Jacob Tucker',
                address: '0xA2f9Cf1E40D7b03aB81e34BC50f0A8c67B4e9112',
                contributionPercent: 100,
            },
        ],
        image: 'https://cdn2.suno.ai/image_large_8bcba6bc-3f60-4921-b148-f32a59086a4c.jpeg',
        mediaUrl: 'https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3',
        mediaType: 'audio/mpeg',
    });
};
exports.createDefaultIPMetadata = createDefaultIPMetadata;
