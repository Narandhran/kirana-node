const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
const config = require('../config')[process.env.NODE_ENV];

var productSchema = new Schema({
    shop_id: {
        type: Schema.Types.ObjectId,
        ref: 'shop'
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        autopopulate: true
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
productSchema.plugin(require('mongoose-autopopulate'));
var Product = model('product', productSchema);
module.exports = { Product };