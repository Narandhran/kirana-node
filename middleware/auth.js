const { verify } = require('../services/custom/jwt.service');
const { errorHandler } = require('../utils/handler');
module.exports = {
    tokenVerification: (req, res, next) => {

        if (!req.headers.authorization)
            errorHandler(req, res, new Error('No token found'));
        else
            try {
                req.verifiedToken = verify(req.headers.authorization);
                next();
            } catch (err) {
                errorHandler(req, res, err);
            }
    },

    authorize: (roles = []) => {
        if (typeof roles === 'string')
            roles = [roles];
        return [
            (req, res, next) => {
                let token = req.verifiedToken;
                if (!roles.some(r => token.role.indexOf(r) >= 0))
                    errorHandler(req, res, new Error('Unauthorized, Access denied.'));
                next();
            }
        ];
    }
};