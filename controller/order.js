const { findOrderByUser, placeOrder,getInvoice } = require('../services/order');
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
    },
    getInvoice:(req,res)=>{
        getInvoice(req,(err,result)=>{
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Invoice generated sccessfully', result);
        });
    }
};