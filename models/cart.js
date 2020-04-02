const { model, Schema } = require('mongoose');

var cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        autopopulate: true
    },
    volume: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }

}, { timestamps: true, });

cartSchema.plugin(require('mongoose-autopopulate'));

var Cart = model('cart', cartSchema);

module.exports = { Cart };