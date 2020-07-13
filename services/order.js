const { Order } = require('../models/order');
const { Shop } = require('../models/shop');
const { User } = require('../models/user');
const { alphaNumeric, autoIdGen, onlyNumber } = require('../utils/autogen');
const { generateTemplate, transporter } = require('./custom/mailer.service');
const { generatePdf } = require('./custom/pdf.service');
const { createOrder, verify } = require('./custom/razorpay.service');
const moment = require('moment');
const config = require('../config')[process.env.NODE_ENV];
const axios = require('axios').default;

module.exports = {
    placeOrder: async (request, cb) => {
        var orderObj = { ...request.body };
        let isUser = await User.findById(request.verifiedToken._id);
        orderObj.receipt = autoIdGen(8, alphaNumeric);
        orderObj.orderId = autoIdGen(8, onlyNumber);
        orderObj.user_id = request.verifiedToken._id;
        if (orderObj.modeOfPayment == 'online') {
            await createOrder(orderObj, async (err, result) => {
                if (err) cb(new Error('Order attempt failed', {}));
                else {
                    let persisted = { ...orderObj, ...result };
                    await Order.create(persisted, async (err, result) => {
                        cb(err, result);
                    });
                }
            });
        } else {
            orderObj.trackingStatus = 'Processing';
            await Order.create(orderObj, async (err, result) => {
                if (err) cb(new Error('Error while placing order', {}));
                else {
                    let mailOption = await generateTemplate({
                        fullname: isUser.fullname,
                        orderId: orderObj.orderId,
                        subTotal: orderObj.subTotal,
                        deliveryFee: orderObj.deliveryFee,
                        discount: orderObj.discount,
                        total: orderObj.amount
                    }, 'order/orderConfirm.html');
                    Promise.all([
                        await axios.get(config.smsGateWay.uri(isUser.phone, `Hi ${isUser.fullname}, your order has been placed successfully. Kindly note the order reference number ${orderObj.orderId} for further communication. Have a great day, Team SignVision.`)),
                        await transporter.sendMail({
                            from: '"no-reply@get2basket.com" <Signvisionsolutionpvt@gmail.com>',
                            to: isUser.username,
                            subject: 'Order confirmed',
                            html: mailOption
                        })
                    ]).then(result => {
                        cb(null, 'Order placed successfully');
                    }).catch(error => {
                        cb(error, {});
                    });
                }

            });
        }
    },
    paymentVerification: async (request, cb) => {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
        let isVerified = await verify(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        let isUser = await User.findById(request.verifiedToken._id);
        if (isVerified) {
            await Order
                .findOneAndUpdate({
                    'id': razorpay_order_id
                }, {
                    'isPaymentSuccess': true,
                    'trackingStatus': 'Processing'
                }, { new: true })
                .exec(async (err, result) => {
                    console.log(JSON.stringify(result));
                    let mailOption = await generateTemplate({
                        fullname: isUser.fullname,
                        orderId: result.orderId,
                        subTotal: result.subTotal,
                        deliveryFee: result.deliveryFee,
                        discount: result.discount,
                        total: result.amount
                    }, 'order/orderConfirm.html');
                    Promise.all([
                        await axios.get(config.smsGateWay.uri(isUser.phone, `Hi ${isUser.fullname}, your order has been placed successfully. Kindly note the order reference number ${result.id} for further communication. Have a great day, Team SignVision.`)),
                        await transporter.sendMail({
                            from: '"no-reply@get2basket.com" <Signvisionsolutionpvt@gmail.com>',
                            to: isUser.username,
                            subject: subject,
                            html: mailOption
                        })
                    ]).then(result => {
                        cb(null, 'Order placed successfully');
                    }).catch(e => { cb(e, {}); });
                });
        }
        else cb(new Error('Payment verification failed', {}));
    },
    findOrderByUser: async (request, cb) => {
        Order
            .find({ user_id: request.verifiedToken._id })
            .populate({ path: 'shop_id', select: 'name picture' })
            .sort({ 'createdAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    getInvoice: async (request, cb) => {
        let isOrder = await Order
            .findById(request.params.id)
            .populate({ path: 'productDetails.product_id', select: 'name brand productCode' })
            .populate({ path: 'user_id', select: 'fname lname address' })
            .lean();
        if (isOrder.trackingStatus == 'Delivered') {
            isOrder.createdAt = moment.utc(isOrder.createdAt).local().format('YYYY-MM-DD HH:mm:ss');
            generatePdf(
                {
                    resPath: 'order'
                },
                {
                    template: 'order/invoice.html',
                    data: {
                        products: isOrder
                    },
                    outputPath: 'invoice/' + isOrder.orderId
                },
                (err, result) => cb(err, result)
            );
        }
        else
            cb(new Error('Invoice is only for successful delivery of any order'), {});
    },
    findOrdersByVendor: async (request, cb) => {
        let { status = 'ALL' } = request.params;
        let query = {};
        query = status == 'ALL' ? {} : { 'trackingStatus': status };
        let shops = await Shop.find({ 'vendor_id': request.verifiedToken._id });
        await Order
            .find({ 'shop_id': { $in: shops }, ...query })
            .sort({ 'createdAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    applyPromo: async (request, cb) => {
        let { promoCode, subTotal } = request.body;
        let isShop = await Shop.findById(request.params.id).lean();
        let discount = 0, total = 0;
        if (isShop.promo.exp >= new Date()) {
            if (isShop.promo.code == promoCode) {
                discount = isShop.promo.value;
                total = subTotal + isShop.deliveryFee - discount;
                cb(null, { subTotal, deliveryFee: isShop.deliveryFee, discount, total });
            } else
                cb(null, 'Promo code is not valid!');
        } else cb(null, 'Promo expired, try new code!');
    },
    updateDeliveryStatus: async (request, cb) => {
        let { status } = request.body;
        await Order
            .findByIdAndUpdate(request.params.id, { 'trackingStatus': status })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};