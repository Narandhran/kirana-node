const { AdminOnly, AllUsers } = require('../utils/auth.util');
const productCtrl = require('../controller/product.controller');
module.exports = app => {
    /**
     * AdminOnly
     */
    app.post('/product/create', AdminOnly, productCtrl.createOneOrMany);
    app.post('/product/add_pictures/:id', AdminOnly, productCtrl.addPictures);


    /**
     * All Users
     */
    app.get('/product/list', productCtrl.listAllProducts);
};