const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');

var productSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    product_id: {
        type: String
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
        quantity: Number,
        suffix: { type: String, enum: ['Kg', 'Ml', 'Ltr', 'Grms', 'Piece'] },
        price: Number
    }],
    description: {
        type: String
    }
});
productSchema.virtual('getPictures').get(function () {
    let persisted = [];
    this.pictures.forEach(function (e) {
        persisted.push(`${process.env.GET_RESOURCE_BASE_PATH}${e}`);
    });
    return persisted;
});
var Product = model('product', productSchema);
module.exports = { Product };