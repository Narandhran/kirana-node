const { Category } = require('../models/category');
const { Product } = require('../models/product');
const { loadMulter } = require('./custom/multipart.service');

module.exports = {
    createCategory: async (request, cb) => {
        let upload = loadMulter.single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.picture = request.file.filename;
                Category.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    listAllCategories: async (request, cb) => {
        await Category
            .find({})
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateCategoryById: async (request, cb) => {
        let upload = loadMulter.single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.picture = request.file.filename;
                Category.findByIdAndUpdate(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    deleteCategoryById: async (request, cb) => {
        await Product.deleteMany({ category_id: request.params.id }).lean();
        await Category
            .deleteOne({ _id: request.params.id })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};