const dotenv = require('dotenv').config();
module.exports = {
    name: 'API',
    version: '1',
    env: process.env.NODE_ENV || 'development',
    adminer: {
        port: process.env.SERVER_PORT || 8081,
        base_url: process.env.BASE_URL || 'http://localhost:8081',
    },
    db: {
        uri: `${process.env.MONGODB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}` || 'mongodb://172.31.144.124:4889/neosila',
    },
};