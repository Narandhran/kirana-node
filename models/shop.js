const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');

var shopSchema = new Schema({
    name: {
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
            maxlength: 10
        }
    }
}, { timestamps: true });

var Shop = model('shop', shopSchema);

module.exports = { Shop };