const { Order } = require('../models/order');
const { Cart } = require('../models/cart');
const { onlyNumber, autoIdGen } = require('../utils/autogen');
const { generateTemplate, transporter } = require('../services/custom/mailer.service');

module.exports = {
    placeOrder: async (request, cb) => {
        let orderObj = request.body;
        orderObj.orderId = autoIdGen(8, onlyNumber);
        orderObj.user_id = request.verifiedToken._id;
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
                    to: ['suresh@multicitydigital.com','accounts@reelbox.tv'],
                    subject: 'Order Notification',
                    html: adminMailOption
                });
            }
            else cb(new Error('Error while saving order to database'));
        } catch (error) {
            cb(error);
        };
    },
    findOrderByUser: async (request, cb) => {
        Order
            .find({ user_id: request.verifiedToken._id })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};