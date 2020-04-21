const { AddressBook } = require('../models/address_book');

module.exports = {
    addAddress: async (request, cb) => {
        let addObj = request.body;
        addObj.user_id = request.verifiedToken._id;
        AddressBook.create(addObj, (err, result) => {
            cb(err, result);
        });
    },
    updateAddressById: async (request, cb) => {
        AddressBook
            .findByIdAndUpdate(request.params.id, request.body)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    deleteAddressById: async (request, cb) => {
        AddressBook
            .findByIdAndDelete(request.params.id)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listAddresses: async (request, cb) => {
        console.log(JSON.stringify(request.verifiedToken));
        AddressBook
            .find({ 'user_id': request.verifiedToken._id })
            .exec((err, result) => {
                cb(err, result);
            });
    }
};