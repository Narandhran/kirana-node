const { createCategory, listAllCategories, updateCategoryById, deleteCategoryById } = require('../services/category.service');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    createCategory: (req, res) => {
        createCategory(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'category(s) created successfully', result);
        });
    },
    listAllCategories: (req, res) => {
        listAllCategories(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Category(s) listed successfully', result);
        });
    },
    updateCategoryById: (req, res) => {
        updateCategoryById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'category updated successfully', result);
        });
    },
    deleteCategoryById: (req, res) => {
        deleteCategoryById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'successfully delted category and belonging products', result);
        });
    }
};