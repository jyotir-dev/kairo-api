// Environment Variables
require('dotenv').config();

// Express Application
const app = require('./app');

// Logger
const logger = require('./lib/logger');

// Database
const connectDB = require('./config/database');

// Port
const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {

    try {
        await connectDB();
    } catch {
        process.exit(1);
    }

    const server = app.listen(PORT, () => {
        logger.success('SERVER', `Listening on port ${PORT}`, `${Math.round(process.uptime() * 1000)}ms`);
    });

    server.on('error', (error) => {
        logger.warn('SERVER', error.code === 'EADDRINUSE' ? `Port ${PORT} is already in use.` : error.message);
        process.exit(1);
    });
};

// Start Server
startServer();