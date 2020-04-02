const { addToCart, removeFromCart, viewMyCart } = require('../services/cart.service');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    addToCart: (req, res) => {
        addToCart(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product added to the cart successfully');
        });
    },
    removeFromCart: (req, res) => {
        removeFromCart(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product removed from the cart successfully', result);
        });
    },
    viewMyCart: (req, res) => {
        viewMyCart(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Listed cart successfully', result);
        });
    }
};