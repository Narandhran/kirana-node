const shopCtrl = require('../controller/shop');
const { AdminOnly, VendorOnly, AllUsers, VendorAndAdmin } = require('../utils/auth.util');
module.exports = app => {
    app.post('/shop/request_to_create', VendorOnly, shopCtrl.requestToAddShop);
    app.post('/shop/nearby', AllUsers, shopCtrl.findShopNearBy);
    app.put('/shop/respond_to_add', AdminOnly, shopCtrl.respondToAddShop);
    app.put('/shop/update_details/:id', VendorOnly, shopCtrl.updateDetails);
};