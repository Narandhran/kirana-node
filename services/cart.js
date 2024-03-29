const { Cart } = require('../models/cart');
module.exports = {
    addToCart: async (request, cb) => {
        let cartObj = request.body;
        cartObj.user_id = request.verifiedToken._id;
        let isCart = await Cart.findOne({ 'user_id': request.verifiedToken._id });
        if (isCart && isCart.shop_id != cartObj.shop_id) {
            let e = new Error();
            e.name = 'UnmatchedShop';
            e.message = 'Shop didn\'t match';
            cb(e, {});
        } else {
            await Cart
                .create(cartObj, (err, result) => {
                    cb(err, result);
                });
        }
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
            .populate({path: 'shop_id',select: 'deliveryFee'})
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