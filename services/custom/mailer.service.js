const { createTransport } = require('nodemailer');
const fs = require('fs');
const path = require('path');
var inlineCss = require('nodemailer-juice');
const Handlebars = require('handlebars');

const templateUtil = {
    companyName: 'Get2Basket',
    supportMail: 'customercare@get2basket.com',
    adminMail: 'admin@get2basket.com',
};

var transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'Signvisionsolutionpvt@gmail.com',
        pass: 'Welcome2signvision'
    }
});

transporter.use('compile', inlineCss());


var generateTemplate = (templateData, file) => {
    let data = { ...templateData, ...templateUtil };
    var source = fs.readFileSync(path.resolve('utils/template/' + file), 'utf8');
    var template = Handlebars.compile(source);
    return template(data);
};

module.exports = { transporter, generateTemplate };