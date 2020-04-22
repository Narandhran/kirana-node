const { Order } = require('../models/order');
const { Cart } = require('../models/cart');
const { alphaNumeric, autoIdGen } = require('../utils/autogen');
const { generateTemplate, transporter } = require('./custom/mailer.service');
const { generatePdf } = require('./custom/pdf.service');
const { createOrder, verify } = require('./custom/razorpay.service');
const moment = require('moment');
module.exports = {
    placeOrder: async (request, cb) => {
        let orderObj = request.body;
        orderObj.receipt = autoIdGen(8, alphaNumeric);
        orderObj.user_id = request.verifiedToken._id;
        createOrder(orderObj, (err, result) => {
            if (err) cb(new Error('Order attempt failed', {}));
            else {
                let persisted = { ...orderObj, ...result };
                Order.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
        /*
        try {
            let isOrder = await Order.create(orderObj);
            if (isOrder) {
                await Cart.deleteMany({ 'user_id': request.verifiedToken._id }).lean();
                let userMailOption = await generateTemplate({
                    fullname: isOrder.shipmentDetails.billingAddress.name,
                    orderId: isOrder.orderId,
                    subTotal: isOrder.subTotal,
                    tax: isOrder.tax,
                    total: isOrder.totalPrice
                }, 'orderConfirm.html');
                await transporter.sendMail({
                    from: '"no-reply@neerwash.com" <bugs@reelbox.tv',
                    to: isOrder.shipmentDetails.billingAddress.email,
                    subject: 'Ordered from NeerWash',
                    html: userMailOption
                }, (error, result) => {
                    cb(error, { orderId: isOrder.orderId });
                });
                let adminMailOption = await generateTemplate({
                    userFullname: isOrder.shipmentDetails.billingAddress.name,
                    orderId: isOrder.orderId,
                    subTotal: isOrder.subTotal,
                    tax: isOrder.tax,
                    total: isOrder.totalPrice
                }, 'orderNotifAdmin.html');
                await transporter.sendMail({
                    from: '"no-reply@neerwash.com" <bugs@reelbox.tv',
                    to: ['suresh@multicitydigital.com', 'accounts@reelbox.tv'],
                    subject: 'Order Notification',
                    html: adminMailOption
                });
            }
            else cb(new Error('Error while saving order to database'));
        } catch (error) {
            cb(error);
        };
        */
    },
    paymentVerification: async (request, cb) => {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
        let isVerified = verify(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        if (isVerified) {
            await Order.updateOne({
                'id': razorpay_order_id
            }, {
                'isPaymentSuccess': true,
                'trackingStatus': 'ordered'
            }, (err, result) => {
                cb(err, result);
            });
        }
        else cb(new Error('Payment verification failed', {}));
    },
    findOrderByUser: async (request, cb) => {
        Order
            .find({ user_id: request.verifiedToken._id })
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
        if (isOrder) {
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
    }
};