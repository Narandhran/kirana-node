const { findShopNearBy, requestToAddShop, respondToAddShop, updateDetails } = require('../services/shop');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    /**
     * Vendor can request to add a shop
     */
    requestToAddShop: (req, res) => {
        requestToAddShop(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop registered successfully', result);
        });
    },
    /**
     * Shops within 5km radius will list to the user
     */
    findShopNearBy: (req, res) => {
        findShopNearBy(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop listed successfully', result);
        });
    },
    /**
     * Admin can either approve or block the shop
     */
    respondToAddShop:(req, res) => {
        respondToAddShop(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    /**
     * Vendor can update the details of the shop
     */
    updateDetails:(req, res) => {
        updateDetails(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop updated successfully', result);
        });
    },
};