const { model, Schema } = require('mongoose');

var cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: { type: Number },
    suffix: { type: String, enum: ['Kg', 'Ml', 'Ltr', 'Grms', 'Piece'] },
    price: { type: Number },
    howMany: { type: Number }
}, { timestamps: true, });

var Cart = model('cart', cartSchema);

module.exports = { Cart };