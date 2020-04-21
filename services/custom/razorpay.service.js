const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: 'rzp_test_m0hjWTJAGI5LlD',
    key_secret: 'bB3wHTL8DXttQBi9euS2AQFD'
});

module.exports.createOrder = async (options, cb) => {
    let { amount, currency = 'INR', receipt, payment_capture = 1, notes } = options;
    await instance.orders.create({
        amount: amount,
        currency: currency,
        receipt: receipt,
        payment_capture: payment_capture,
        notes: notes
    }, (err, result) => {
        cb(err, result);
    });
};