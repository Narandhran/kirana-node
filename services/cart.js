const { Cart } = require('../models/cart');
module.exports = {
    addToCart: async (request, cb) => {
        let cartObj = request.body;
        cartObj.user_id = request.verifiedToken._id;
        await Cart
            .create(cartObj, (err, result) => {
                cb(err, result);
            });
    },
    removeCartByUser: async (request, cb) => {
        await Cart
            .deleteMany({ 'user_id': request.verifiedToken._id })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listCartByUser: async (request, cb) => {
        await Cart
            .find({ 'user_id': request.verifiedToken._id })
            .populate({ path: 'product_id', select: 'product_id name pictures brand description' })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    removeItemFromCart: async (request, cb) => {
        await Cart.findByIdAndDelete(request.params.id)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateCart: async (request, cb) => {
        await Cart.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};