const { AdminOnly, AllUsers } = require('../utils/auth.util');
const addBookCtrl = require('../controller/address_book');

module.exports = app => {
    /**
     * All users
     */
    app.post('/address/create', AllUsers, addBookCtrl.addAddress);
    app.get('/address/list', AllUsers, addBookCtrl.listAddresses);
    app.put('/address/update/:id', AllUsers, addBookCtrl.updateAddressById);
    app.delete('/address/delete/:id', AllUsers, addBookCtrl.deleteAddressById);
};