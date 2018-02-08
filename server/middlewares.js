const User = require('./models/user');
const mongoose = require('mongoose');

module.exports.authorization = (req, res, next) => {
    let email = req.header('email');

    if (!email) return res.status(401).send();

    User.findOne({email})
        .then(user => user ? next() : res.status(401).send())
        .catch(err => next(err));
};

module.exports.databaseConnectionCheck = (req, res, next) => {
    const connected = mongoose.connection.readyState;

    connected ? next() : next('Database connection lost');
};


