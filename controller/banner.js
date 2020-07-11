const { list, create, updateBanner } = require('../services/banner');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    create: (req, res) => {
        create(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'category created successfully', result);
        });
    },
    list: (req, res) => {
        list(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },

    updateBanner: (req,res)=>{
        updateBanner(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Updated successfully', result);
        });
    }
};