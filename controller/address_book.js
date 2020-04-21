const { addAddress, listAddresses, updateAddressById, deleteAddressById } = require('../services/address_book');
const { successHandler, errorHandler } = require('../utils/handler');
module.exports = {
    addAddress: (req, res) => {
        addAddress(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Address created successfully', result);
        });
    },
    listAddresses: (req, res) => {
        listAddresses(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Address listed successfully', result);
        });
    },
    updateAddressById: (req, res) => {
        updateAddressById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Address updated successfully', result);
        });
    },
    deleteAddressById: (req, res) => {
        deleteAddressById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Address deleted successfully', result);
        });
    }
};