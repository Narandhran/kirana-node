const { model, Schema } = require('mongoose');

var orderSchema = new Schema({
    id: {
        type: String,
        unique: true
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
    amount: {
        type: Number
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
        name: { type: String, minlength: 3, maxlength: 16 },
        address: { type: String, minlength: 5, maxlength: 100 },
        phone: { type: String, minlength: 10, maxlength: 10 },
        landmark: { type: String, minlength: 5, maxlength: 20 }
    },
    status: {
        type: String,
        default: 'created',
        enum: ['created', 'attempted', 'failed']
    }
}, { timestamps: true });
orderSchema.plugin(require('mongoose-unique-validator'));
orderSchema.plugin(require('mongoose-autopopulate'));
var Order = model('order', orderSchema);
module.exports = { Order };