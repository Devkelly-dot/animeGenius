const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Define a custom format for the logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const errorLogger = createLogger({
    level: 'info', // Change this to 'debug' for more detailed logs
    format: combine(
        timestamp(),
        errors({ stack: true }), // This will log the stack trace
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ],
});

module.exports = errorLogger;