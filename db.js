const mongoose = require('mongoose');

// establish connection to mongodb
var database = {
    connectivity: (config) => {
        mongoose.set('debug', true);
        mongoose.Promise = global.Promise;
        mongoose.connect(config.db.uri, { useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });
        const db = mongoose.connection;
        return db;
    }
};

module.exports = database;