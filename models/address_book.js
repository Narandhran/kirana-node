const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');

var addressBookSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fullName: { type: String },
    flat: { type: String },
    street: { type: String },
    phone1: { type: String, required: true, maxlength: 10, minlength: 10 },
    city: { type: String },
    pincode: { type: String, minlength: 6, maxlength: 6 },
    state: { type: String, default: 'Bangalore' },
    country: { type: String, default: 'India' },
    landmark: { type: String },
    lat: { type: Number },
    lan: { type: Number },
    isDefault: { type: Boolean, default: false }
}, { timestamps: true });

var AddressBook = model('address_book', addressBookSchema);

module.exports = { AddressBook };