const { createLogger, transports, format } = require('winston');
const { combine, prettyPrint } = format;

module.exports = {
    errorLogger: createLogger({
        format: combine(
            prettyPrint()
        ),
        transports: [
            new transports.File({
                filename: `${process.env.POST_RESOURCE_BASE_PATH}logs/error.log`,
                level: 'error'
            })
        ]
    }),
    succcessLogger: createLogger({
        format: combine(
            prettyPrint()
        ),
        transports: [
            new transports.File({
                filename: `${process.env.POST_RESOURCE_BASE_PATH}logs/success.log`
            })
        ]
    })
};