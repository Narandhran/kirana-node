const { findOrderByUser, placeOrder, getInvoice, paymentVerification,updateDeliveryStatus,
    findOrdersByVendor, viewOrdersByVendor,applyPromo } = require('../services/order');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    placeOrder: (req, res) => {
        placeOrder(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order created successfully', result);
        });
    },
    paymentVerification: (req, res) => {
        paymentVerification(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Payment verified successfully', result);
        });
    },
    findOrderByUser: (req, res) => {
        findOrderByUser(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order(s) listed successfully', result);
        });
    },

    getInvoice: (req, res) => {
        getInvoice(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Invoice generated successfully', result);
        });
    },
    findOrdersByVendor:(req, res) => {
        findOrdersByVendor(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order(s) listed successfully', result);
        });
    },
    applyPromo:(req, res) => {
        applyPromo(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Applied successfully', result);
        });
    },
    updateDeliveryStatus:(req, res) => {
        updateDeliveryStatus(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Updated successfully', result);
        });
    }
};