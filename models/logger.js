const { model, Schema } = require('mongoose');

var loggerSchema = new Schema({
    ip: String,
    method: String,
    url: String,
    host: String
}, { timestamps: true });

var Logger = model('logger', loggerSchema);
module.exports = { Logger };