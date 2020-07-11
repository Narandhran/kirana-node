const { model, Schema } = require('mongoose');

var bannerSchema = new Schema({
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        require: true
    },
    banner: {
        type: String,
        maxlength: 32,
        required: true
    }
}, { timestamps: true });

var Banner = model('banner', bannerSchema);
module.exports = { Banner };