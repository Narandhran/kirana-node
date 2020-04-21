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
    app.get('/product/list', productCtrl.listAllProducts);
    app.get('/product/list/:id',productCtrl.listAllByCategory);
};