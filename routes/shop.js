const shopCtrl = require('../controller/shop');
const { AdminOnly, VendorOnly, AllUsers, VendorAndAdmin } = require('../utils/auth.util');
module.exports = app => {
    /** Admin */
    app.put('/shop/respond_to_add', AdminOnly, shopCtrl.respondToAddShop);
    app.get('/shop/list/:status', AdminOnly, shopCtrl.viewShopsByStatus);
    app.put('/shop/update_thumb/:id', VendorAndAdmin, shopCtrl.updateThumb);

    /** Vendor and Admin */
    app.put('/shop/update_delivery_slot',VendorAndAdmin,shopCtrl.updateDeliverySlot);

    /** Vendor */
    app.post('/shop/request_to_create', VendorOnly, shopCtrl.requestToAddShop);
    app.put('/shop/update_details/:id', VendorOnly, shopCtrl.updateDetails);
    app.get('/shop/list_my_shops', VendorOnly, shopCtrl.viewMyShops);
    app.delete('/shop/delete/:id', VendorOnly, shopCtrl.deleteShopById);
    app.put('/shop/make_unavail/:id', VendorOnly, shopCtrl.makeUnavailable);
    app.get('/shop/generate_promo', VendorOnly, shopCtrl.generatePromo);

    /** All Users */
    app.post('/shop/nearby', shopCtrl.findShopNearBy);
    app.get('/shop/search/:filter', shopCtrl.shopFilter);
};