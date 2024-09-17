const winston = require('winston');
require('winston-mongodb');
const { combine, timestamp, printf, colorize } = winston.format;

// Define allowed transports
const allowedTransports = [];

// Add Console transport
allowedTransports.push(new winston.transports.Console({
    format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(log => `${log.timestamp} [${log.level}]: ${log.message}`)
    )
}));

// Create logger
const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(log => `${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`)
    ),
    transports: allowedTransports
});

// Export the logger
module.exports = logger;
