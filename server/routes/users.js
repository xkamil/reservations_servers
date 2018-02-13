const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => next(err));
});

router.post('/:email', (req, res, next) => {
    const email = req.params.email;

    User.findOne({email})
        .then(user => user ? user : new User({email}).save())
        .then(user=> {
            res.cookie('user', JSON.stringify(user),{ expires: new Date(Date.now() + 9000000), httpOnly: false});
            res.json(user);
        })
        .catch(err => err.errors ? res.status(400).json(err.errors) : next(err))
});

router.delete('/', (req, res, next) => {
    User.remove()
        .then(() => res.end())
        .catch(err => next(err))
});

module.exports = router;