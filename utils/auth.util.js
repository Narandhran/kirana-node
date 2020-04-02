const { tokenVerification, authorize } = require('../middleware/auth');
module.exports = {
    AdminOnly: [tokenVerification, authorize(['ADMIN'])],
    VendorAndAdmin: [tokenVerification, authorize(['ADMIN', 'VENDOR'])],
    AllUsers: [tokenVerification, authorize(['ADMIN', 'VENDOR', 'USER'])]
};