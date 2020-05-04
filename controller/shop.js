const { addShop, findShopNearBy } = require('../services/shop');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    addShop: (req, res) => {
        addShop(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop registered successfully', result);
        });
    },
    findShopNearBy:(req, res) => {
        findShopNearBy(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop listed successfully', result);
        });
    },
};