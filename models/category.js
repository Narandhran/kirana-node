const { model, Schema } = require('mongoose');

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
        get: pic => `${process.env.GET_RESOURCE_BASE_PATH}category/${pic}`,
    }
});

var Category = model('category', categorySchema);
module.exports = { Category };