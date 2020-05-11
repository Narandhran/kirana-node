var path = require('path');
var multer = require('multer');
const config = require('../../config')[process.env.NODE_ENV];

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        switch (file.fieldname) {
            case 'dp':
                cb(null, `${config.POST_RESOURCE_BASE_PATH}dp`);
                break;
            case 'products':
                cb(null, `${config.POST_RESOURCE_BASE_PATH}product`);
                break;
            case 'category':
                cb(null, `${config.POST_RESOURCE_BASE_PATH}category`);
                break;
            case 'shop':
                cb(null, `${config.POST_RESOURCE_BASE_PATH}shop`);
                break;
            default:
                // cb(null, `${config.POST_RESOURCE_BASE_PATH}`);
                break;
        }
    },
    filename: (req, file, cb) => {
        if (file)
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

var loadMulter = multer({
    storage: fileStorage,
    fileFilter: function (req, file, cb) {
        if (file.size > (5 * 1024 * 1024)) {
            var e = new Error('File size is should not exceet 5Mb');
            e.name = 'FileValidationError';
            return cb(e, false);
        }
        else cb(null, true);
    },
    limits: { fileSize: (5 * 1024 * 1024) }
});

module.exports = { loadMulter };