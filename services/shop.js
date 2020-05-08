const { Shop } = require('../models/shop');
const { kmToRadian } = require('./custom/geo.service');
const { loadMulter } = require('./custom/multipart.service');

module.exports = {
    /**
     * Only vendor
     */
    requestToAddShop: async (request, cb) => {
        let shopObj = request.body;
        let upload = loadMulter.single('shop');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(shopObj.textField);
                persisted.vendor_id = request.verifiedToken._id;
                persisted.picture = request.file.filename;
                Shop.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
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
    viewShopsByStatus: async (request, cb) => {
        let { status } = request.params;
        await Shop.find({ 'status': status }, 'name location owner')
            .exec((err, result) => {
                cb(err, result);
            });
    },
};