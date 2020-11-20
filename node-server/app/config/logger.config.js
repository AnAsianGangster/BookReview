require('dotenv').config();
const { createLogger, transports, format } = require('winston');
require('winston-mongodb');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.MongoDB({
            db: process.env.MONGODB,
            collection: 'Log',
        }),
    ],
});

module.exports = logger;
