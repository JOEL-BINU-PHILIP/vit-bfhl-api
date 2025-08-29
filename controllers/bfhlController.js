const DataProcessor = require('../services/dataProcessor');
const config = require('../config/config');
const logger = require('../utils/logger');

class BfhlController {
    static async processData(req, res) {
        try {
            const { data } = req.body;

            // Log the incoming request
            logger.info(`Processing data array with ${data.length} elements`);

            // Process the data using the service layer
            const processedData = DataProcessor.processArray(data);

            // Build response with user information
            const response = {
                is_success: true,
                user_id: config.USER_ID,
                email: config.EMAIL,
                roll_number: config.ROLL_NUMBER,
                odd_numbers: processedData.oddNumbers,
                even_numbers: processedData.evenNumbers,
                alphabets: processedData.alphabets,
                special_characters: processedData.specialCharacters,
                sum: processedData.sum,
                concat_string: processedData.concatString
            };

            logger.info('Data processed successfully');
            return res.status(200).json(response);

        } catch (error) {
            logger.error('Error processing data:', error);

            return res.status(500).json({
                is_success: false,
                error: 'Internal server error occurred while processing data',
                message: 'Please check your input and try again'
            });
        }
    }
}

module.exports = BfhlController;