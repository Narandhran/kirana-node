const { findShopNearBy, requestToAddShop, viewShopsByStatus, viewMyShops, shopFilter,
    respondToAddShop, updateDetails, deleteShopById, makeUnavailable } = require('../services/shop');
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
    respondToAddShop: (req, res) => {
        respondToAddShop(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    /**
     * Vendor can update the details of the shop
     */
    updateDetails: (req, res) => {
        updateDetails(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop updated successfully', result);
        });
    },
    /**
     * Vendor can view his/her own shops
     */
    viewMyShops: (req, res) => {
        viewMyShops(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop(s) listed successfully', result);
        });
    },
    /**
     * Admin can list shop by status
     */
    viewShopsByStatus: (req, res) => {
        viewShopsByStatus(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop(s) listed successfully', result);
        });
    },
    deleteShopById: (req, res) => {
        deleteShopById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop removed successfully', result);
        });
    },
    /**
     * User can filter any shop
     */
    shopFilter: (req, res) => {
        shopFilter(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, '', result);
        });
    },
    /**
     * Make unavailable
     */
    makeUnavailable:(req, res) => {
        makeUnavailable(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Shop is now Unavailable', result);
        });
    },
};