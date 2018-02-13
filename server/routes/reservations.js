const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

router.get('/', (req, res, next) => {
    Reservation.find()
        .then(user => res.json(user))
        .catch(err => next(err));
});

router.post('/',  (req, res, next) => {
    const reservation = Object.assign({user: req.user.email}, req.body);
    const newReservation = new Reservation(reservation);

    newReservation.save()
        .then(data => res.json(data))
        .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;

    Reservation.remove({_id})
        .then(() => res.end())
        .catch(err => next(err))
});

router.delete('/', (req, res, next) => {
    Reservation.remove()
        .then(() => res.end())
        .catch(err => next(err))
});

function find(sourceArray, propName, propValue) {
    let result = {};

    sourceArray.forEach(item => {
        if (item[propName].toString() === propValue) {
            result = item;
        }
    });

    return result;
}

module.exports = router;