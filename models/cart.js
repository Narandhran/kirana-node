const { model, Schema } = require('mongoose');

var cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
}, { timestamps: true, });

var Cart = model('cart', cartSchema);

module.exports = { Cart };