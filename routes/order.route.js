const orderCtrl = require('../controller/order.controller');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /**
     * All Users
     */
    app.post('/order/place_order', AllUsers, orderCtrl.placeOrder);
    app.get('/order/get_my_orders',AllUsers,orderCtrl.findOrderByUser);
};