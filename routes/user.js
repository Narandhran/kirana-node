const { AdminOnly, AllUsers } = require('../utils/auth.util');
const userCtrl = require('../controller/user');
module.exports = app => {
    /**
     * AdminOnly
     */
    // app.get('/user/list_users', userCtrl.listUsers);


    /**
     * All Users
     */
    app.post('/user/register', userCtrl.registration);
    app.post('/user/login', userCtrl.login);
    app.post('/user/login_otp',userCtrl.loginOtp);
    app.put('/user/update', AllUsers, userCtrl.updateUserById);
    app.post('/user/update_dp', AllUsers, userCtrl.updateDisplayPicture);
    app.get('/user/get_my_data', AllUsers, userCtrl.getUserById);
    app.post('/request_otp', userCtrl.requestOtp);
    app.post('/user/reset_password', userCtrl.resetPassword);
};