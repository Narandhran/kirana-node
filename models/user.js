const { model, Schema } = require('mongoose');
const { paths } = require('../utils/global.constant');
var uniqueValidator = require('mongoose-unique-validator');
const config = require('../config')[process.env.NODE_ENV];

var userSchema = new Schema({
    fname: { type: String, required: true, minlength: 3, maxlength: 16 },
    lname: { type: String, required: false, minlength: 3, maxlength: 16 },
    username: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value);
            },
            message: '{VALUE} is not a valid email'
        },
        required: [true, 'Email is required']
    },
    password: String,
    dob: { type: Date, required: false },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    phone: {
        type: String,
        required: true,
        unique: true,
        max: 10,
        min: 10
    },
    dp: {
        type: String,
        default: null
    },
    fcm: {
        type: [String],
        minlength: 36
    },
    verify: {
        // loginFlag: { type: Boolean, default: false },
        otp: { type: Number, require: true },
        expireTime: { type: Date }
    },
    mobile_uuid: {
        type: String,
        default: undefined,
        maxlength: 40
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'USER'
    }
}, { timestamps: true });
userSchema.virtual('fullname').get(function () {
    return `${this.fname} ${this.lname}`;
});
userSchema.plugin(uniqueValidator);
var User = model('user', userSchema);
module.exports = { User };