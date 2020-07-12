const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');

var slotSchema = new Schema({
    slot: String,
    time: String,
    flag: Boolean
}, { timestamps: false });

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
        enum: ['Pending', 'Approve', 'Unavailable', 'Remove'],
        default: 'Pending'
    },
    isUnavailable: {
        type: Boolean,
        default: true
    },
    deliveryFee: {
        type: Number,
        required: false,
        default: 0
    },
    deliverySlot: {
        type: [slotSchema],
        default: [{ slot: 'Morning', time: '07:00 to 10:00', flag: true },
        { slot: 'Afternoon', time: '12:00 to 02:00', flag: true },
        { slot: 'Evening', time: '05:00 to 07:30', flag: true }]
    },
    promo: {
        code: { type: String, maxlength: 8 },
        value: { type: Number, max: 999 },
        exp: { type: Date },
        flag: { type: Boolean, default: false }
    }
}, { timestamps: true });

var Shop = model('shop', shopSchema);

module.exports = { Shop };