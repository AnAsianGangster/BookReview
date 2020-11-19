require('dotenv').config();
const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

console.log(process.env.MONGODB);

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGODB,
            collection: 'InfoLog',
        }),
        // TODO logger structure
    ],
});

module.exports = logger;
