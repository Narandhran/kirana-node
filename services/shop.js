const { Shop } = require('../models/shop');
const { kmToRadian } = require('./custom/geo.service');
const { loadMulter } = require('./custom/multipart.service');
const { inspect } = require('util');

module.exports = {
    /**
     * Only vendor
     */
    requestToAddShop: async (request, cb) => {
        let upload = loadMulter.single('shop');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.vendor_id = request.verifiedToken._id;
                persisted.picture = request.file.filename;
                Shop.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    updateDetails: async (request, cb) => {
        let upload = loadMulter.single('shop');
        await upload(request, null, (err) => {
            if (err) {
                cb(err, {});
            }
            else {
                let persisted = {};
                persisted = JSON.parse(request.body.textField);
                if (request.file)
                    persisted.picture = request.file.filename;
                // console.log('persisted: ' + persisted);
                Shop.findByIdAndUpdate(request.params.id, persisted, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    viewMyShops: async (request, cb) => {
        await Shop
            .find({ 'vendor_id': request.verifiedToken._id }, 'name location owner status picture createdAt')
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
                    location: 1,
                    owner: 1,
                    picture: 1,
                    distance: {
                        $concat: [{
                            $substr: [{
                                $toString: {
                                    $divide: ['$distance', 1000]
                                }
                            }, 0, 3]
                        }, ' Km']
                    },
                    isUnavailable: 1
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
        await Shop.findByIdAndUpdate(shopId, { status }, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    viewShopsByStatus: async (request, cb) => {
        let { status = 'ALL' } = request.params;
        let query = status == 'ALL' ? {} : { 'status': status };
        await Shop
            .find(query, 'name location owner status picture createdAt')
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
};