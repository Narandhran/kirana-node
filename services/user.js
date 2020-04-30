const { User } = require('../models/user');
const { AddressBook } = require('../models/address_book');
const { encrypt, validate } = require('./custom/crypto.service');
const { generateTemplate, transporter } = require('./custom/mailer.service');
const { sign } = require('./custom/jwt.service');
const { loadMulter } = require('./custom/multipart.service');
const { onlyNumber, autoIdGen, alphaNumeric } = require('../utils/autogen');
const { addTime } = require('../utils/date.util');
const collection = 'users';

/**
 * User Service
 */

module.exports = {

    registration: async (request, cb) => {
        let userObj = request.body;
        let isAdmin = await User.find({}).lean();
        let plainPassword = autoIdGen(6, alphaNumeric);
        userObj.password = encrypt(plainPassword);
        try {
            userObj.role = isAdmin.length > 0 ? 'USER' : 'ADMIN';
            let isUser = await User.create(userObj);
            if (isUser) {
                let mailOption = await generateTemplate({ fullname: isUser.fullname, username: isUser.username, password: plainPassword }, 'registration/userRegistration.html');
                transporter.sendMail({
                    from: '"no-reply@get2basket.com" <Signvisionsolutionpvt@gmail.com>',
                    to: isUser.username,
                    subject: 'login credential for Get2Basket',
                    html: mailOption
                }, (error, result) => {
                    cb(error, result);
                });
            }
            else cb(new Error('Error while registering an employee'));
        } catch (error) {
            cb(error);
        }
    },

    login: async (request, cb) => {
        let { username, password, fcm } = request.body;
        let isUser = await User.findOne({ 'username': username, 'active': true });
        if (isUser) {
            isUser.fcm = fcm;
            await isUser.save();
            if (validate(password, isUser.password)) {
                try {
                    let token = sign({
                        _id: isUser._id,
                        username: isUser.username,
                        role: isUser.role,
                        fullname: isUser.fullname
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
        let addressBook = await AddressBook.find({ 'user_id': request.verifiedToken._id }).lean();
        await User.findById(request.verifiedToken._id, projection, (err, result) => {
            if (result.dp != null) result.dp = result.dp;
            cb(err, { result, addressBook });
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
    requestOtp: async (request, cb) => {
        let isUser = await User.findOne({ 'username': request.body.email });
        if (isUser) {
            let otp = autoIdGen(5, onlyNumber);
            isUser.verify.otp = otp;
            isUser.verify.expireTime = addTime({ min: 10 });
            await isUser.save();
            let mailOption = await generateTemplate({ fullname: `${isUser.fname} ${isUser.lname}`, otp: otp, message: 'reset your password' }, 'registration/sendOtp.html');
            await transporter.sendMail({
                from: '"no-reply@get2basket.com" <Signvisionsolutionpvt@gmail.com>',
                to: isUser.username,
                subject: 'One Time Password to resetting password!!',
                html: mailOption
            }, (error, result) => {
                console.log(result);
                cb(error, 'Otp sent successfully');
            });
        } else cb(new Error('Invalid Email address'), {});
    },
    resetPassword: async (request, cb) => {
        let { email, otp, password } = request.body;
        let isUser = await User.findOne({ 'username': email });
        if (isUser) {
            if (password.length > 5) {
                if (isUser.verify.expireTime >= new Date()) {
                    if (otp == isUser.verify.otp) {
                        isUser.password = encrypt(password);
                        await isUser.save();
                        cb(null, 'Password updated');
                    } else cb(new Error('Invaid otp, try again', {}));
                } else cb(new Error('Otp expired, request again', {}));
            } else cb(new Error('password should be atleast 6 character'));
        } else cb(new Error('Invalid email address', {}));
    },
};