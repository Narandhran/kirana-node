const { Shop } = require('../models/shop');
const { kmToRadian } = require('./custom/geo.service');
module.exports = {
    addShop: async (request, cb) => {
        await Shop.create(request.body, (err, result) => {
            cb(err, result);
        });
    },
    findShopNearBy: async (request, cb) => {
        let sourceCoordinates = request.body;
        var query = {
            'location': {
                '$geoWithin': {
                    '$centerSphere': [sourceCoordinates, kmToRadian(15)]
                }
            }
        };
        await Shop.find(query)
            .exec((err, result) => {
                cb(err, result);
            });
    }
};