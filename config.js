const dotenv = require('dotenv').config();

module.exports = {
    name: 'API',
    version: '1',
    development: {
        SERVER_PORT: '1403',
        DB_NAME: 'kiranashop',
        DB_PORT: '27017',
        DB_HOST: 'mongodb://localhost',
        GET_RESOURCE_BASE_PATH: 'http://52.66.226.142/kirana-resources/',
        POST_RESOURCE_BASE_PATH: '/var/www/html/kirana-resources/'
    },
    production: {
        SERVER_PORT: '1403',
        DB_NAME: 'kiranashop',
        DB_PORT: '3669',
        DB_HOST: 'mongodb://localhost',
        GET_RESOURCE_BASE_PATH: 'http://localhost/kirana-resources/',
        POST_RESOURCE_BASE_PATH: '/var/www/html/kirana-resources/'
    }
};