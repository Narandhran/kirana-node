const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');

var shopSchema = new Schema({
    vendor_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: { type: '2dsphere', sparse: false },
            required: true
        }
    },
    owner: {
        name: {
            type: String
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 10,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Approve', 'Unavailable', 'Block'],
        default: 'Pending'
    },
    isUnavailable: {
        type: Boolean,
        default: true
    },
    banner: {
        type: [String],
        required: false,
        default: []
    },
    deliveryFee: {
        type: Number,
        required: false,
        default: 0
    },
    promoCode: {
        type: String,
        required: false,
        default: null,
        maxlength: 8
    }
}, { timestamps: true });

var Shop = model('shop', shopSchema);

module.exports = { Shop };