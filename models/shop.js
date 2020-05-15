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
    }
}, { timestamps: true });

var Shop = model('shop', shopSchema);

module.exports = { Shop };