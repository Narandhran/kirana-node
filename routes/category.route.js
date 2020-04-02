const { AdminOnly,VendorAndAdmin, AllUsers } = require('../utils/auth.util');
const categoryCtrl = require('../controller/category.controller');
module.exports = app => {
    /**
     * AdminOnly
     */
    app.post('/category/create', VendorAndAdmin, categoryCtrl.createCategory);


    /**
     * All Users
     */
    app.get('/category/list', AllUsers, categoryCtrl.listAllCategories);
};