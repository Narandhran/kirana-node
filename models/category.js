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
        type: String
    }
});

var Category = model('category', categorySchema);
module.exports = { Category };