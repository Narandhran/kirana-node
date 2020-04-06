const { addToCart, listCartByUser, removeCartByUser, removeItemFromCart } = require('../services/cart.service');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    addToCart: (req, res) => {
        addToCart(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product added to the cart successfully', result);
        });
    },
    removeCartByUser: (req, res) => {
        removeCartByUser(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Cart cleared successfully', result);
        });
    },
    listCartByUser: (req, res) => {
        listCartByUser(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Listed cart successfully', result);
        });
    },
    removeItemFromCart: (req, res) => {
        removeItemFromCart(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Item removed successfully', result);
        });
    },
};