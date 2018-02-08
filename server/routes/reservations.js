const express = require('express');
const router = express.Router();
const protectedRouter = express.Router();
const User = require('../models/user');
const Reservation = require('../models/reservation');
const Resource = require('../models/resource');

router.get('/', (req, res, next) => {
    Reservation.getAll()
        .then(data => res.json(data))
        .catch(err => next(err))
});

protectedRouter.post('/', (req, res, next) => {
    const reservation = req.body;
    const userId = req.user ? req.user._id : null;
    const resourceId = reservation ? reservation.resourceId : null;

    const newReservation = {
        user: userId,
        resource: resourceId,
        dateFrom: reservation.dateFrom,
        dateTo: reservation.dateTo
    };

    Reservation.add(newReservation)
        .then(data => res.json(data))
        .catch(err => next(err))
});

protectedRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Reservation.delete(id)
        .then(() => res.send())
        .catch(err => next(err))
});

protectedRouter.delete('/', (req, res, next) => {
    Reservation.deleteAll()
        .then(() => res.send())
        .catch(err => next(err))
});

module.exports = {router, protectedRouter};