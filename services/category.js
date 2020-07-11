const { Category } = require('../models/category');
const { Product } = require('../models/product');
const { loadMulter } = require('./custom/multers3.service');

module.exports = {
    createCategory: async (request, cb) => {
        let upload = loadMulter(5,'category').single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.picture = request.file.key;
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
        let upload = loadMulter(5,'category').single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.picture = request.file.key;
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