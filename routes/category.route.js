const { AdminOnly, VendorAndAdmin, AllUsers } = require('../utils/auth.util');
const categoryCtrl = require('../controller/category.controller');
module.exports = app => {
    /**
     * AdminOnly
     */
    app.delete('/category/delete/:id', AdminOnly, categoryCtrl.deleteCategoryById);
    app.put('/category/update', AdminOnly, categoryCtrl.updateCategoryById);

    /**
     * Vendor And Admin
     */
    app.post('/category/create', VendorAndAdmin, categoryCtrl.createCategory);

    /**
     * All Users
     */
    app.get('/category/list', AllUsers, categoryCtrl.listAllCategories);
};