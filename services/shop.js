const { Shop } = require('../models/shop');
const { kmToRadian } = require('./custom/geo.service');
module.exports = {
    /**
     * Only vendor
     */
    requestToAddShop: async (request, cb) => {
        let shopObj = request.body;
        shopObj.vendor_id = request.verifiedToken._id;
        await Shop.create(shopObj, (err, result) => {
            cb(err, result);
        });
    },
    updateDetails: async (request, cb) => {
        await Shop.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    viewMyShops: async (request, cb) => {
        await Shop.find({ 'vendor_id': request.verifiedToken._id }, 'name location owner status')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    /**
     * Users
     */
    findShopNearBy: async (request, cb) => {
        let sourceCoordinates = request.body;
        var query = {
            'location': {
                '$geoWithin': {
                    '$centerSphere': [sourceCoordinates, kmToRadian(5)]
                }
            }
        };
        await Shop.find(query)
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
};