const Joi = require('joi');
const logger = require('../utils/logger');

// Validation schema
const dataSchema = Joi.object({
    data: Joi.array()
        .items(Joi.alternatives().try(
            Joi.string(),
            Joi.number()
        ))
        .min(1)
        .max(1000) // Reasonable limit to prevent abuse
        .required()
        .messages({
            'array.base': 'Data must be an array',
            'array.empty': 'Data array cannot be empty',
            'array.min': 'Data array must contain at least 1 element',
            'array.max': 'Data array cannot contain more than 1000 elements',
            'any.required': 'Data field is required'
        })
});

/**
 * Middleware to validate incoming requests
 */
const validateRequest = (req, res, next) => {
    try {
        // Validate request body structure
        const { error, value } = dataSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            logger.warn('Validation failed:', errorMessages);

            return res.status(400).json({
                is_success: false,
                error: 'Validation failed',
                details: errorMessages,
                example: {
                    data: ["a", "1", "334", "4", "R", "$"]
                }
            });
        }

        // Store validated data
        req.body = value;
        next();

    } catch (err) {
        logger.error('Validation middleware error:', err);
        return res.status(500).json({
            is_success: false,
            error: 'Internal validation error'
        });
    }
};

module.exports = validateRequest;