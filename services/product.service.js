const { Product } = require('../models/product');
const { loadMulter } = require('../services/custom/multipart.service');
const collection = 'users';
const { inspect } = require('util');

module.exports = {
    createOneOrMany: async (request, cb) => {
        await Product.insertMany(request.body, (err, result) => {
            cb(err, result);
        });
    },
    listAllProducts: async (request, cb) => {
        await Product
            .find({})
            .exec((err, result) => {
                if (!err)
                    result.forEach(e => {
                        e.pictures = e.getPictures;
                    });
                cb(err, result);
            });
    },
    addPictures: async (request, cb) => {
        let upload = loadMulter.array('products', 4);
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                Product
                    .findByIdAndUpdate(request.params.id, {
                        pictures: request.files.map(e => {
                            return e.filename;
                        })
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    }
};