const express = require('express');
const router = express.Router();
const BfhlController = require('../controllers/bfhlController');
const validateRequest = require('../middleware/validateRequest');

// POST /bfhl - Main processing endpoint
router.post('/', validateRequest, BfhlController.processData);

// GET /bfhl - Optional endpoint for testing API availability
router.get('/', (req, res) => {
    res.status(200).json({
        operation_code: 1,
        is_success: true,
        message: 'BFHL API is running. Use POST method to process data.'
    });
});

module.exports = router;