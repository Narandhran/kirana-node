const { Banner } = require('../models/banner');
const { loadMulter } = require('./custom/multers3.service');
module.exports = {
    create: async (request, cb) => {
        let upload = loadMulter(5, 'banner').single('banner');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else
                Banner.create({ 'shopId': request.params.id, 'banner': request.file.key },
                    (err, result) => {
                        cb(err, result);
                    });
        });
    },
    list: async (request, cb) => {
        await Banner.find({ 'shopId': request.params.id })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateBanner: async (request, cb) => {
        let upload = loadMulter(5, 'banner').single('banner');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Banner
                    .findByIdAndUpdate(request.params.id, {
                        banner: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    }
};