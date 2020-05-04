const shopCtrl = require('../controller/shop');
module.exports = app => {
    app.post('/shop/create', shopCtrl.addShop);
    app.post('/shop/nearby',shopCtrl.findShopNearBy);
};