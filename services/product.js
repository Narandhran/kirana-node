const { Product } = require('../models/product');
const { loadMulter } = require('./custom/multipart.service');
const { inspect } = require('util');

module.exports = {
    createProduct: async (request, cb) => {
        let upload = loadMulter.array('products', 3);
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.pictures = request.files.map(e => {
                    return e.filename;
                });
                Product.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    listAllProducts: async (request, cb) => {
        await Product
            .find({ 'shop_id': request.params.id })
            .exec((err, result) => {
                if (!err)
                    result.forEach(e => {
                        e.pictures = e.getPictures;
                    });
                cb(err, result);
            });
    },
    listAllByCategory: async (request, cb) => {
        await Product
            .find(request.body)
            .exec((err, result) => {
                if (!err)
                    result.forEach(e => {
                        e.pictures = e.getPictures;
                    });
                cb(err, result);
            });
    },
    updateProductById: async (request, cb) => {
    },
    deleteProductById: async (request, cb) => {
        await Product
            .deleteOne({ _id: request.params.id })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};