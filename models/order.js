const { model, Schema } = require('mongoose');

var orderSchema = new Schema({
    id: {
        type: String
    },
    orderId: {
        type: Number,
        unique: true
    },
    shop_id: {
        type: Schema.Types.ObjectId,
        ref: 'shop'
    },
    currency: {
        type: String,
        default: 'INR'
    },
    receipt: {
        type: String
    },
    payment_capture: {
        type: Boolean,
        default: 1
    },
    notes: {
        type: Array,
    },
    attempts: {
        type: Number,
        default: 0
    },
    modeOfPayment: {
        type: String,
        enum: ['cash', 'online'],
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
    deliveryFee: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number
    },
    discount: {
        type: Number,
        required: false
    },
    productDetails: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            // autopopulate: true,
            required: true
        },
        quantity: { type: Number },
        suffix: { type: String },
        price: { type: Number },
        howMany: { type: Number, default: 1 }
    }],
    shipmentDetails: {
        type: Schema.Types.ObjectId,
        ref: 'address_book'
    },
    deliverySlot: {
        slot: {
            type: String,
            enum: ['Morning', 'Afternoon', 'Evening'],
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        default: 'attempted',
        enum: ['created', 'attempted', 'failed']
    },
    isPaymentSuccess: { type: Boolean, default: false },
    trackingStatus: {
        type: String,
        default: 'NA',
        enum: ['Processing', 'Delivered', 'NA']
    }
}, { timestamps: true });
orderSchema.plugin(require('mongoose-unique-validator'));
orderSchema.plugin(require('mongoose-autopopulate'));
var Order = model('order', orderSchema);
module.exports = { Order };