const dotenv = require('dotenv').config();

module.exports = {
    name: 'API',
    version: '1',
    local: {
        SERVER_PORT: '1403',
        DB_NAME: 'kiranashop',
        DB_PORT: '27017',
        DB_HOST: 'mongodb://localhost',
        GET_RESOURCE_BASE_PATH: 'http://localhost/kirana-resources/',
        POST_RESOURCE_BASE_PATH: '/var/www/html/kirana-resources/',
        smsGateWay: {
            uri: (mobile, message) => {
                return `http://smsweb.smsleases.com/app/smsapi/index.php?key=25EE0CAE8A3760&campaign=0&routeid=9&type=text&contacts=${mobile}&senderid=SMSSPT&msg=${message}`;
            }
        },
    },
    production: {
        SERVER_PORT: '1403',
        DB_NAME: 'kiranashop',
        DB_PORT: '3669',
        DB_HOST: 'mongodb://52.66.226.142',
        GET_RESOURCE_BASE_PATH: 'http://52.66.226.142/kirana-resources/',
        POST_RESOURCE_BASE_PATH: '/var/www/html/kirana-resources/',
        smsGateWay: {
            uri: (mobile, message) => {
                return `http://smsweb.smsleases.com/app/smsapi/index.php?key=25EE0CAE8A3760&campaign=0&routeid=9&type=text&contacts=${mobile}&senderid=SMSSPT&msg=${message}`;
            }
        }
    },
};