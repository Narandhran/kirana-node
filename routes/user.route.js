const { AdminOnly, AllUsers } = require('../utils/auth.util');
const userCtrl = require('../controller/user.controller');
module.exports = app => {
    /**
     * AdminOnly
     */
    // app.get('/user/list_users', userCtrl.listUsers);


    /**
     * All Users
     */
    // app.post('/user/register', userCtrl.registration);
    app.post('/user/login', userCtrl.login);
    app.put('/user/update', AllUsers, userCtrl.updateUserById);
    app.post('/user/update_dp', AllUsers, userCtrl.updateDisplayPicture);
    app.get('/user/get_my_data', AllUsers, userCtrl.getUserById);
};