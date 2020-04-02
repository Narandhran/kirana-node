const { createOneOrMany, listAllProducts, addPictures } = require('../services/product.service');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    createOneOrMany: (req, res) => {
        createOneOrMany(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) created successfully', result);
        });
    },
    listAllProducts: (req, res) => {
        listAllProducts(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) listed successfully', result);
        });
    },
    addPictures: (req, res) => {
        addPictures(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) picture updated successfully', result);
        });
    }
};