const { model, Schema } = require('mongoose');

var orderSchema = new Schema({
    orderId: {
        type: Number,
        unique: true
    },
    modeOfDelivery: {
        type: String,
        enum: ['cash', 'card', 'upi'],
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    subTotal: {
        type: Number
    },
    tax: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    productDetails: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            autopopulate: true,
            required: true
        },
        quantityPrice: {
            type: Schema.Types.Mixed,
            required: true
        }
    }],
    shipmentDetails: {
        type: Schema.Types.Mixed
    },
    status: {
        type: String,
        default: 'ordered',
        enum: ['ordered', 'delivered', 'returned']
    }
});
orderSchema.plugin(require('mongoose-unique-validator'));
orderSchema.plugin(require('mongoose-autopopulate'));
var Order = model('order', orderSchema);
module.exports = { Order };