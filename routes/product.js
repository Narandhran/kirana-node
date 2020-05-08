const { AdminOnly, AllUsers } = require('../utils/auth.util');
const productCtrl = require('../controller/product');
module.exports = app => {
    /**
     * AdminOnly
     */
    app.post('/product/create', AdminOnly, productCtrl.createProduct);
    app.get('/product/delete/:id', AdminOnly, productCtrl.deleteProductById);


    /**
     * All Users
     */
    app.get('/product/list_by_shop/:id', productCtrl.listAllProducts);
    app.get('/product/list_by_category',productCtrl.listAllByCategory);
};