const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bfhlRoutes = require('./routes/bfhl');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.',
        is_success: false
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Main API routes
app.use('/bfhl', bfhlRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        is_success: false,
        available_endpoints: ['/health', '/bfhl']
    });
});

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully...');
    process.exit(0);
});

app.listen(PORT, () => {
    const baseUrl = `http://localhost:${PORT}`;

    console.log('\n🚀 VIT BFHL API Server Started Successfully!');
    console.log('═'.repeat(60));
    console.log(`📍 Server URL: ${baseUrl}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
    console.log('═'.repeat(60));

    console.log('\n📋 Available Endpoints:');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ METHOD │ ENDPOINT │ DESCRIPTION                          │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log(`│ POST   │ ${baseUrl}/bfhl   │ Main data processing endpoint        │`);
    console.log(`│ GET    │ ${baseUrl}/bfhl   │ API status and operation code        │`);
    console.log(`│ GET    │ ${baseUrl}/health │ Health check endpoint                │`);
    console.log('└─────────────────────────────────────────────────────────┘');

    console.log('\n🧪 Test Commands:');
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│ Test with curl:                                         │');
    console.log(`│ curl -X POST ${baseUrl}/bfhl \\                    │`);
    console.log('│   -H "Content-Type: application/json" \\                │');
    console.log('│   -d \'{"data": ["a","1","334","4","R", "$"]}\'           │');
    console.log('└─────────────────────────────────────────────────────────┘');

    console.log('\n📝 Quick Test URLs:');
    console.log(`   Health Check: ${baseUrl}/health`);
    console.log(`   API Status:   ${baseUrl}/bfhl`);

    console.log('\n💡 Tips:');
    console.log('   • Use POST method for data processing');
    console.log('   • Send data as JSON array in request body');
    console.log('   • Check /health endpoint for server status');
    console.log('   • Press Ctrl+C to stop the server\n');

    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;