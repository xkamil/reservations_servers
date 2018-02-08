const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => next(err));
});

router.post('/:email', (req, res, next) => {
    const EMAIL_PATTERN = /^.+@pega\.com$/;
    const email = req.params.email || '';

    if (!EMAIL_PATTERN.test(email)) {
        return res.status(400).json({message: 'Invalid email.'})
    }

    User.findOne({email})
        .then(user => {
            if (user) return res.json(user);

            new User({email})
                .save()
                .then(user => res.json(user))
                .catch(err => next(err));
        })
        .catch(next)
});

router.delete('/', (req, res, next) => {
    User.remove()
        .then(() => res.json('All users removed'))
        .catch(err => next(err))
});

module.exports = router;