const orderCtrl = require('../controller/order');
const { AdminOnly, AllUsers, VendorOnly } = require('../utils/auth.util');

module.exports = app => {
    /**
     * All Users
     */
    app.post('/order/place_order', AllUsers, orderCtrl.placeOrder);
    app.get('/order/get_my_orders', AllUsers, orderCtrl.findOrderByUser);
    app.post('/order/verify_payment', AllUsers, orderCtrl.paymentVerification);
    app.get('/order/invoice/:id', orderCtrl.getInvoice);

    /**
     * Vendor
     */
    app.get('/order/view/:id', VendorOnly,orderCtrl.viewOrdersByVendor);
};