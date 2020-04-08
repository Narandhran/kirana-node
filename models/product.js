const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
const config = require('../config')[process.env.NODE_ENV];

var productSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    productCode: {
        type: String,
        required: false
    },
    name: {
        type: String
    },
    brand: {
        type: String
    },
    pictures: {
        type: [String]
    },
    info: {
        type: String
    },
    quantityPrice: [{
        quantity: { type: Number },
        suffix: { type: String, enum: ['Kg', 'Ml', 'Ltr', 'Grms', 'Piece'] },
        price: { type: Number },
        availability: { type: Boolean, default: true }
    }],
    description: {
        type: String
    }
});
productSchema.virtual('getPictures').get(function () {
    let persisted = [];
    this.pictures.forEach(function (e) {
        persisted.push(`${config.GET_RESOURCE_BASE_PATH}product/${e}`);
    });
    return persisted;
});
var Product = model('product', productSchema);
module.exports = { Product };