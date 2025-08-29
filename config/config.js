try {
    require('dotenv').config();
} catch (err) {
    console.log('dotenv not found, using environment variables or defaults');
}

const config = {
    // User information - UPDATE THESE WITH YOUR DETAILS
    USER_ID: process.env.USER_ID || "john_doe_17091999", // Format: {full_name_ddmmyyyy}
    EMAIL: process.env.EMAIL || "john@xyz.com",
    ROLL_NUMBER: process.env.ROLL_NUMBER || "ABCD123",
    // Server configuration
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // API configuration
    MAX_ARRAY_SIZE: parseInt(process.env.MAX_ARRAY_SIZE) || 1000,
    RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX) || 100,

    // CORS configuration
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '*'
};

// Validation for required fields
const validateConfig = () => {
    const required = ['USER_ID', 'EMAIL', 'ROLL_NUMBER'];
    const missing = required.filter(key => !config[key]);

    if (missing.length > 0) {
        console.warn(`Warning: Missing configuration for: ${missing.join(', ')}`);
        console.warn('Using default values. Please set these in environment variables or update config.js');
    }
};

validateConfig();

module.exports = config;