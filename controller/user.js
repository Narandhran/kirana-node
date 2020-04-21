const { registration, login, getUserById, updateUserById, updateDisplayPicture } = require('../services/user');
const { successHandler, errorHandler } = require('../utils/handler');

/**
 * User Controller
 */
module.exports = {

    /**
     * User Registration
     */
    registration: (req, res) => {
        registration(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Registered user successfully', result);
        });
    },
    /**
     * User login
     */
    login: (req, res) => {
        login(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Successfully logged in!!', result);
        });
    },
    /**
     * Update display picture
     */
    updateDisplayPicture: (req, res) => {
        updateDisplayPicture(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Display picture has updated', result);
        });
    },
    /**
     * Get an user details
     */
    getUserById: (req, res) => {
        getUserById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Retrived user data successfully', result);
        });
    },
    /**
     * Update User
     */
    updateUserById: (req, res) => {
        updateUserById(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'User data updated successfully', result);
        });
    }
};