const shopCtrl = require('../controller/shop');
const { AdminOnly, VendorOnly, AllUsers, VendorAndAdmin } = require('../utils/auth.util');
module.exports = app => {
    /** Admin */
    app.put('/shop/respond_to_add', AdminOnly, shopCtrl.respondToAddShop);
    app.get('/shop/list/:status', AdminOnly, shopCtrl.viewShopsByStatus);
    /** Vendor */
    app.post('/shop/request_to_create', VendorOnly, shopCtrl.requestToAddShop);
    app.put('/shop/update_details/:id', VendorOnly, shopCtrl.updateDetails);
    app.get('/shop/list_my_shops', VendorOnly, shopCtrl.viewMyShops);

    /** All Users */
    app.post('/shop/nearby', AllUsers, shopCtrl.findShopNearBy);
};