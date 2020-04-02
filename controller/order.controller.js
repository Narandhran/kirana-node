const { findOrderByUser, placeOrder } = require('../services/order.service');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    placeOrder: (req, res) => {
        placeOrder(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order placed successfully', result);
        });
    },
    findOrderByUser: (req, res) => {
        findOrderByUser(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order(s) listed successfully', result);
        });
    }
};