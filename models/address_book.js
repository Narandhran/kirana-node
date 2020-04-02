const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');

var addressBookSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    billingAddress: {
        fullname: { type: String, max: 16 },
        address: { type: String, max: 100 },
        phone: { type: String, min: 10, max: 10 },
    },
    deliveryAddress: {
        fullname: { type: String, max: 16 },
        address: { type: String, max: 100 },
        phone: { type: String, min: 10, max: 10 },
        gmap: { tye: String }
    }
});