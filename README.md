# VIT BFHL API

A REST API built for VIT Full Stack assignment that processes arrays and categorizes data into numbers, alphabets, and special characters.

## Features

- ✅ Process mixed arrays with numbers, alphabets, and special characters
- ✅ Separate odd and even numbers
- ✅ Convert alphabets to uppercase
- ✅ Calculate sum of all numbers
- ✅ Create concatenated string with alternating caps in reverse order
- ✅ Professional error handling and validation
- ✅ Security middleware (Helmet, CORS, Rate limiting)
- ✅ Comprehensive test coverage
- ✅ Structured logging
- ✅ Ready for deployment on Vercel/Railway/Render

## API Endpoints

### POST /bfhl
Processes an array and returns categorized data.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl
Returns API status and operation code.

### GET /health
Health check endpoint for monitoring.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd vit-bfhl-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your details
   ```

4. **Update your information in `.env`:**
   ```env
   USER_ID=your_name_ddmmyyyy
   EMAIL=your.email@domain.com
   ROLL_NUMBER=YOUR_ROLL_NUMBER
   ```

5. **Run locally:**
   ```bash
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```

## Testing

Run the test suite:
```bash
npm test
```

The tests cover all the example cases provided in the assignment.

## Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Render
1. Connect your GitHub repository to Render
2. Choose "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

## Project Structure

```
├── server.js                 # Main application file
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment configuration
├── .env.example             # Environment variables template
├── config/
│   └── config.js            # Application configuration
├── routes/
│   └── bfhl.js              # BFHL route definitions
├── controllers/
│   └── bfhlController.js    # Business logic controller
├── services/
│   └── dataProcessor.js     # Data processing service
├── middleware/
│   ├── validateRequest.js   # Request validation middleware
│   └── errorHandler.js      # Global error handling
├── utils/
│   └── logger.js            # Logging utility
└── tests/
    └── bfhl.test.js         # Test suite
```

## Key Features

### Security
- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Joi schema validation

### Error Handling
- **Global Error Handler**: Centralized error management
- **Graceful Degradation**: Meaningful error messages
- **Request Logging**: Track API usage

### Code Quality
- **Modular Architecture**: Separated concerns
- **Comprehensive Tests**: Full test coverage
- **Environment Configuration**: Flexible deployment
- **Professional Structure**: Industry standard practices

## Configuration

Update the following in your `.env` file:

```env
# Your personal information
USER_ID=your_full_name_ddmmyyyy  # e.g., rahul_sharma_25121999
EMAIL=your.email@vit.ac.in
ROLL_NUMBER=YOUR_VIT_ROLL_NUMBER

# Optional configurations
PORT=3000
NODE_ENV=production
MAX_ARRAY_SIZE=1000
```

## API Usage Examples

### Example 1: Mixed Data
```bash
curl -X POST https://your-api-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

### Example 2: Complex Data
```bash
curl -X POST https://your-api-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]}'
```

## License

MIT License - feel free to use this code for your assignment.

## Notes

- Numbers are returned as