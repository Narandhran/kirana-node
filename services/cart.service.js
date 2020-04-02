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
    removeFromCart: async (request, cb) => {
        await Cart
            .deleteOne({ _id: request.params.id })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    viewMyCart: async (request, cb) => {
        await Cart
            .find({ 'user_id': request.verifiedToken._id })
            .exec((err, result) => {
                cb(err, result);
            });
    },
};