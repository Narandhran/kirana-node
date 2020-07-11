const bannerCtl = require('../controller/banner');
const { VendorAndAdmin } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.post('/banner/create/:id', VendorAndAdmin, bannerCtl.create);
    app.put('/banner/update/:id', VendorAndAdmin, bannerCtl.updateBanner);

    /**
     * All users
     */
    app.get('/banner/list/:id', bannerCtl.list);
};