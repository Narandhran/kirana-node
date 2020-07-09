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
    app.delete('/shop/delete/:id', VendorOnly, shopCtrl.deleteShopById);
    app.put('/shop/make_unavail/:id', VendorOnly, shopCtrl.makeUnavailable);
    app.put('/shop/create_update_banner/:id', VendorAndAdmin, shopCtrl.createOrUpdateBanner);

    /** All Users */
    app.post('/shop/nearby', shopCtrl.findShopNearBy);
    app.get('/shop/search/:filter', shopCtrl.shopFilter);
    app.get('/shop/list_banner_shop/:id', shopCtrl.getBannersByShopId);
};