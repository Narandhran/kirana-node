const { User } = require('../models/user');
const { AddressBook } = require('../models/address_book');
const { encrypt, validate } = require('./custom/crypto.service');
const { generateTemplate, transporter } = require('./custom/mailer.service');
const { sign } = require('./custom/jwt.service');
const { loadMulter } = require('./custom/multers3.service');
const { onlyNumber, autoIdGen, alphaNumeric } = require('../utils/autogen');
const { addTime } = require('../utils/date.util');
const { request } = require('express');
const constant = require('../utils/global.constant');
const axios = require('axios').default;
const moment = require('moment');
const config = require('../config')[process.env.NODE_ENV];
const collection = 'users';

/**
 * User Service
 */

module.exports = {

    registration: async (request, cb) => {
        let { username, phone, password, fname, lname = null, role = 'ADMIN' } = request.body;
        let isAdmin = await User.find({}).lean();
        if (request.query.isVendor == 'true')
            role = 'VENDOR';
        else if (isAdmin.length > 0)
            role = 'USER';
        else role = 'ADMIN';
        let isUserPhone = await User.findOne({ 'phone': phone });
        let isUserEmail = await User.findOne({ 'username': username });
        if (isUserPhone) cb(new Error('Phone number already exist', {}));
        else if (isUserEmail) cb(new Error('Email already exist', {}));
        else
            await User.create({
                username,
                phone,
                password: encrypt(password),
                fname,
                lname,
                role
            }, (err, result) => {
                cb(err, result);
            });

    },
    loginOtp: async (request, cb) => {
        let { username, otp, fcm } = request.body;
        let isUser = await User.findOne({
            '$or': [
                { 'phone': username, 'active': true },
                { 'username': username, 'active': true }
            ]
        });
        if (isUser) {
            if (!(isUser.fcm.some(e => {
                return e == fcm;
            }))) {
                isUser.fcm.push(fcm);
                await isUser.save();
            };
            if (new Date() < moment(isUser.verify.expire).add(15, 'm').toDate()) {
                if (isUser.verify.otp == otp) {
                    let token = {};
                    try {
                        token = sign({
                            _id: isUser._id,
                            email: isUser.username,
                            role: isUser.role,
                            fullname: isUser.fullname
                        });
                        cb(null, { role: isUser.role, token, rpath: constant.s3.basePath });
                    } catch (e) { cb(e, {}); };
                } else cb(new Error('OTP invalid, try again!'), {});
            } else cb(new Error('OTP expired'));
        } else cb(new Error('Mobile number not registered'), {});
    },
    login: async (request, cb) => {
        let { username, password, fcm } = request.body;
        let isUser = await User.findOne({
            '$or': [
                { 'phone': username, 'active': true },
                { 'username': username, 'active': true }
            ]
        });
        if (isUser) {
            if (!(isUser.fcm.some(e => {
                return e == fcm;
            }))) {
                isUser.fcm.push(fcm);
                await isUser.save();
            };
            if (validate(password, isUser.password)) {
                try {
                    let token = sign({
                        _id: isUser._id,
                        username: isUser.username,
                        role: isUser.role,
                        fullname: isUser.fullname
                    });
                    cb(null, { token: token, role: isUser.role, rPath: constant.s3.basePath });
                } catch (e) { cb(e); };
            } else { cb(new Error('Incorrect Password')); }
        } else { cb(new Error('Incorrect Username')); }
    },
    updateDisplayPicture: async (request, cb) => {
        let upload = loadMulter(5, 'dp').single('dp');
        await upload(request, null, (err) => {
            if (err)
                cb(err);
            else {
                User
                    .findByIdAndUpdate(request.verifiedToken._id, {
                        dp: request.file.key
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
        let { username, subject } = request.body;
        let isUser = await User.findOne({
            '$or': [
                { 'phone': username, 'active': true },
                { 'username': username, 'active': true }
            ]
        });
        if (isUser) {
            let otp = autoIdGen(5, onlyNumber);
            isUser.verify.otp = otp;
            isUser.verify.expireTime = addTime({ min: 10 });
            await isUser.save();
            let mailOption = await generateTemplate({ fullname: `${isUser.fname} ${isUser.lname}`, otp: otp, message: 'reset your password' }, 'registration/sendOtp.html');
            Promise.all([
                await axios.get(config.smsGateWay.uri(isUser.phone, `Hi ${isUser.fullname}, your OTP is ${otp} will expire in another 15 mins. Kindly use this for login, don't share it with anyone. Have a great day, Team SignVision.`)),
                await transporter.sendMail({
                    from: '"no-reply@get2basket.com" <Signvisionsolutionpvt@gmail.com>',
                    to: isUser.username,
                    subject: subject,
                    html: mailOption
                })
            ]).then(result => {
                cb(null, 'OTP send successfully');
            }).catch(e => { cb(e, {}); });
        } else cb(new Error('Invalid Email address'), {});
    },
    resetPassword: async (request, cb) => {
        let { username, otp, password } = request.body;
        let isUser = await User.findOne({
            '$or': [
                { 'phone': username, 'active': true },
                { 'username': username, 'active': true }
            ]
        });
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