const { AdminOnly, AllUsers } = require('../utils/auth.util');
const cartCtrl = require('../controller/cart.controller');
module.exports = app => {
    /**
     * AdminOnly
     */


    /**
     * All Users
     */
    app.post('/cart/create', AllUsers, cartCtrl.addToCart);
    app.get('/cart/list', AllUsers, cartCtrl.listCartByUser);
    app.post('/cart/update/:id',AllUsers,cartCtrl.updateCart);
    app.delete('/cart/remove/:id', AllUsers, cartCtrl.removeItemFromCart);
    app.delete('cart/clear', AllUsers, cartCtrl.removeCartByUser);
};