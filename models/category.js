const { model, Schema } = require('mongoose');
const config = require('../config')[process.env.NODE_ENV];

var categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 16,
        minlength: 4
    },
    description: {
        type: String
    },
    picture: {
        type: String,
        get: pic => `${config.GET_RESOURCE_BASE_PATH}category/${pic}`,
    }
});

var Category = model('category', categorySchema);
module.exports = { Category };