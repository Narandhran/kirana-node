const orderCtrl = require('../controller/order');
const { AdminOnly, AllUsers, VendorOnly, VendorAndAdmin } = require('../utils/auth.util');

module.exports = app => {

    /** Both Admin and Vendor */
    app.put('/order/find_by_id/:id', VendorAndAdmin, orderCtrl.orderFilter);

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
    app.put('/order/update_delivery_status/:id', VendorOnly, orderCtrl.updateDeliveryStatus);
};