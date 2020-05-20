const { Product } = require('../models/product');
const { loadMulter } = require('./custom/multipart.service');
const { Types } = require('mongoose');
const { inspect } = require('util');

module.exports = {
    createProduct: async (request, cb) => {
        let upload = loadMulter.array('products', 3);
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
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
    updateProductById: async (request, cb) => {
        let upload = loadMulter.array('products', 3);
        await upload(request, null, (err) => {
            if (err) {
                cb(err, {});
            }
            else {
                let persisted = {};
                persisted = JSON.parse(request.body.textField);
                if (request.files)
                    persisted.pictures = request.files.map(e => {
                        return e.filename;
                    });
                Product
                    .findByIdAndUpdate(request.params.id, persisted, { new: true })
                    .populate({ path: 'category_id', select: 'name' })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    listAllProducts: async (request, cb) => {
        await Product
            .find({ 'shop_id': request.params.id })
            .populate({ path: 'category_id', select: 'name' })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listAllByCategory: async (request, cb) => {
        await Product
            .find({
                'shop_id': request.query.sid,
                'category_id': request.query.cid
            })
            .populate({ path: 'category_id', select: 'name' })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    deleteProductById: async (request, cb) => {
        await Product
            .deleteOne({ _id: request.params.id })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    productFilter: async (request, cb) => {
        await Product.find({ name: { $regex: request.params.filter, $options: 'i' } })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    getProductPage: async (request, cb) => {
        let { shopId } = request.params;
        await Promise.all([
            await Product.aggregate([
                {
                    '$match': {
                        'shop_id': Types.ObjectId(shopId)
                    }
                }, {
                    '$group': {
                        '_id': '$category_id'
                    }
                }, {
                    '$lookup': {
                        'from': 'categories',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                }, {
                    '$replaceRoot': {
                        'newRoot': {
                            '$mergeObjects': [
                                {
                                    '$arrayElemAt': [
                                        '$category', 0
                                    ]
                                }, '$$ROOT'
                            ]
                        }
                    }
                }, {
                    '$project': {
                        'name': 1,
                        'description': 1,
                        'picture': 1
                    }
                }
            ]),
            await Product.find({ 'shop_id': shopId }).limit(12)
        ]).then(response => { cb(null, response); }).catch(err => { cb(err, {}); });
    }
};