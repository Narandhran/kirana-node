const { User } = require('../models/user');
const { generatePassword, encrypt, validate } = require('./custom/crypto.service');
const { generateTemplate, transporter } = require('../services/custom/mailer.service');
const { sign } = require('./custom/jwt.service');
const { loadMulter } = require('../services/custom/multipart.service');
const collection = 'users';

/**
 * User Service
 */

module.exports = {

    registration: async (request, cb) => {
        let userObj = request.body;
        let isAdmin = await User.find({}).lean();
        let plainPassword = generatePassword();
        userObj.password = encrypt(plainPassword);
        try {
            userObj.role = isAdmin.length > 0 ? 'USER' : 'VENDOR';
            let isUser = await User.create(userObj);
            if (isUser) {
                let mailOption = await generateTemplate({ fullname: isUser.fullname, username: isUser.username, password: plainPassword, designation: isUser.designation }, 'userRegistration.html');
                transporter.sendMail({
                    from: '"no-reply@get2basket.com" <narandhran@gmail.com',
                    to: isUser.username,
                    subject: 'login credential for Get2Basket',
                    html: mailOption
                }, (error, result) => {
                    cb(error, result);
                });
            }
            else cb(new Error('Error while saving employee to database'));
        } catch (error) {
            cb(error);
        }
    },

    login: async (request, cb) => {
        let userObj = request.body;
        let isUser = await User.findOne({ 'username': userObj.username, 'active': true }).lean();
        if (isUser) {
            if (userObj.mobile_uuid && isUser.mobile_uuid != userObj.mobile_uuid) {
                await User.findByIdAndUpdate(isUser._id, { 'mobile_uuid': userObj.mobile_uuid }).lean();
            }
            if (validate(userObj.password, isUser.password)) {
                try {
                    let token = sign({
                        _id: isUser._id,
                        username: isUser.username,
                        role: isUser.role,
                        fname: isUser.fname
                    });
                    cb(null, token);
                } catch (e) { cb(e); };
            } else { cb(new Error('Incorrect Password')); }
        } else { cb(new Error('Incorrect Username')); }
    },
    updateDisplayPicture: async (request, cb) => {
        let upload = loadMulter.single('dp');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                User
                    .findByIdAndUpdate(request.verifiedToken._id, {
                        dp: request.file.filename
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    getUserById: async (request, cb) => {
        let projection = 'username fname lname gender phone dob dp';
        await User.findById(request.verifiedToken._id, projection, (err, result) => {
            if (result.dp) result.dp = result.dp;
            cb(err, result);
        });
    },
    updateUserById: async (request, cb) => {
        let userObj = request.body;
        if (userObj.password) userObj.password = encrypt(userObj.password);
        await User
            .findByIdAndUpdate(request.verifiedToken._id, userObj)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    forgetPassword: async (request, cb) => {

    }
};