const { createProduct, listAllProducts, deleteProductById, updateProductById, listAllByCategory,
    productFilter, getProductPage } = require('../services/product');
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
        deleteProductById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product removed successfully', result);
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
    },
    /**
     * Vendor
     * Update Product using ID
     */
    updateProductById: (req, res) => {
        updateProductById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Product updated successfully', result);
        });
    },
    /**
  * User can filter any product
  */
    productFilter: (req, res) => {
        productFilter(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, '', result);
        });
    },
    /**
     * List category and products
     */
    getProductPage: (req, res) => {
        getProductPage(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
};