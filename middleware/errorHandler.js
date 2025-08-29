const logger = require('../utils/logger');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log the full error for debugging
    logger.error('Unhandled error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        headers: req.headers
    });

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            is_success: false,
            error: 'Validation failed',
            message: err.message
        });
    }

    if (err.name === 'SyntaxError' && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            is_success: false,
            error: 'Invalid JSON format',
            message: 'Please check your JSON syntax'
        });
    }

    // Default error response
    res.status(err.status || 500).json({
        is_success: false,
        error: err.status === 500 || !err.status ? 'Internal server error' : err.message,
        message: 'An unexpected error occurred'
    });
};

module.exports = errorHandler;