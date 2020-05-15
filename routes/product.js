const { AdminOnly, AllUsers, VendorOnly, VendorAndAdmin } = require('../utils/auth.util');
const productCtrl = require('../controller/product');
module.exports = app => {
    /**
     * AdminOnly
     */
    app.post('/product/create', VendorOnly, productCtrl.createProduct);

    /**
     * All Users
     */
    app.get('/product/list_by_shop/:id', productCtrl.listAllProducts);
    app.get('/product/list_by_category', productCtrl.listAllByCategory);
    app.get('/product/search/:filter', productCtrl.productFilter);

    /**
     * Vendor
     */
    app.put('/product/update/:id', VendorOnly, productCtrl.updateProductById);
    app.delete('/product/delete/:id', VendorOnly, productCtrl.deleteProductById);
};