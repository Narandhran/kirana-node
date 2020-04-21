const { createProduct, listAllProducts, deleteProductById, uploadProductById, listAllByCategory } = require('../services/product');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    /**
     * Create a product
     */
    createProduct: (req, res) => {
        createProduct(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) created successfully', result);
        });
    },
    /**
     * Display all products
     */
    listAllProducts: (req, res) => {
        listAllProducts(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) listed successfully', result);
        });
    },
    /**
     * Detete one product
     */
    deleteProductById: (req, res) => {
        deleteProduct(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) picture updated successfully', result);
        });
    },
    /**
     * List all by category
     */
    listAllByCategory: (req, res) => {
        listAllByCategory(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product(s) listed successfully', result);
        });
    }
};