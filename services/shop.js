const { Shop } = require('../models/shop');
const { kmToRadian } = require('./custom/geo.service');
const { alphaNumeric, autoIdGen, onlyNumber } = require('../utils/autogen');
const { loadMulter } = require('./custom/multers3.service');
const { inspect } = require('util');
const { request } = require('express');

module.exports = {
    /**
     * Only vendor
     */
    requestToAddShop: async (request, cb) => {
        let upload = loadMulter(5, 'shop').single('shop');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.vendor_id = request.verifiedToken._id;
                persisted.picture = request.file.key;
                Shop.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    updateDetails: async (request, cb) => {
        Shop.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateThumb: async (request, cb) => {
        let upload = loadMulter(5, 'shop').single('shop');
        await upload(request, null, (err) => {
            if (err) {
                cb(err, {});
            }
            else {
                Shop
                    .findByIdAndUpdate(request.params.id,
                        { 'picture': request.file.key }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    viewMyShops: async (request, cb) => {
        await Shop
            .find({ 'vendor_id': request.verifiedToken._id })
            .sort({ 'createdAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    /**
     * Users
     */
    findShopNearBy: async (request, cb) => {
        let sourceCoordinates = request.body;
        var query = [
            {
                '$geoNear': {
                    'near': {
                        'type': 'Point',
                        'coordinates': sourceCoordinates
                    },
                    'distanceField': 'distance',
                    'maxDistance': 5000,
                    'query': {
                        'status': 'Approve'
                    },
                    'spherical': false
                }
            }, {
                '$project': {
                    name: 1,
                    vendor_id: 1,
                    location: 1,
                    owner: 1,
                    picture: 1,
                    isUnavailable: 1,
                    status: 1,
                    banner: 1,
                    deliveryFee: 1,
                    promo: 1,
                    distance: {
                        $concat: [{
                            $substr: [{
                                $toString: {
                                    $divide: ['$distance', 1000]
                                }
                            }, 0, 3]
                        }, ' Km']
                    },
                }
            }
        ];

        await Shop.aggregate(query)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    /**
     * Only admin
     */
    respondToAddShop: async (request, cb) => {
        let { status, shopId } = request.body;
        if (status == 'Remove') {
            await Shop.findByIdAndRemove(shopId, (err, result) => {
                cb(err, result);
            });
        } else {
            await Shop.findByIdAndUpdate(shopId, { status }, { new: true })
                .exec((err, result) => {
                    cb(err, result);
                });
        }
    },
    viewShopsByStatus: async (request, cb) => {
        let { status = 'ALL' } = request.params;
        let query = status == 'ALL' ? {} : { 'status': status };
        await Shop
            .find(query)
            .sort({ 'createdAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    deleteShopById: async (request, cb) => {
        await Shop.deleteOne({ _id: request.params.id, status: 'Pending' })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    shopFilter: async (request, cb) => {
        await Shop.find({ name: { $regex: request.params.filter, $options: 'i' } })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    makeUnavailable: async (request, cb) => {
        await Shop.
            findByIdAndUpdate(request.params.id, request.body)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    generatePromo: async (request, cb) => {
        cb(null, autoIdGen(8, alphaNumeric).toUpperCase());
    }
};