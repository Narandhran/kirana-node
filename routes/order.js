const orderCtrl = require('../controller/order');
const { AdminOnly, AllUsers, VendorOnly } = require('../utils/auth.util');

module.exports = app => {
    /**
     * All Users
     */
    app.post('/order/place_order', AllUsers, orderCtrl.placeOrder);
    app.get('/order/get_my_orders', AllUsers, orderCtrl.findOrderByUser);
    app.post('/order/verify_payment', AllUsers, orderCtrl.paymentVerification);
    app.get('/order/invoice/:id', AllUsers, orderCtrl.getInvoice);
    app.post('/order/discount/:id', AllUsers, orderCtrl.applyPromo);

    /**
     * Vendor
     */
    app.get('/order/view/:status', VendorOnly, orderCtrl.findOrdersByVendor);
};