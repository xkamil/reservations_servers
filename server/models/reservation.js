const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Resource = require('./resource');

const reservationSchema = new Schema(
    {
        user: Schema.Types.ObjectId,
        resource: Schema.Types.ObjectId,
        dateFrom: Date,
        dateTo: Date,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {
        versionKey: false
    }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

Reservation.getAll = () => {
    return new Promise((resolve, reject) => {
        Reservation.find({}, (err, data) => err ? reject(err) : resolve(data))
    })
};

Reservation.delete = (id) => {
    return new Promise((resolve, reject) => {
        Reservation.remove({_id: id}, err => err ? reject(err) : resolve())
    })
};

Reservation.deleteAll = () => {
    return new Promise((resolve, reject) => {
        Reservation.remove({}, err => err ? reject(err) : resolve())
    })
};

Reservation.add = (reservation) => {
    const newReservation = new Reservation(reservation);

    return new Promise((resolve, reject) => {
        newReservation.save({}, (err, data) => err ? reject(err) : resolve(data))
    })
};

Reservation.validate = (reservation) => {
    let errors = [];
    let promises = [];

    if (!mongoose.Types.ObjectId.isValid(reservation.userId)) {
        errors.push(`Invalid user id: ${reservation.userId}`)
    } else {
        promises.push(User.findById(reservation.userId))
    }

    if (!mongoose.Types.ObjectId.isValid(reservation.resourceId)) {
        errors.push(`Invalid resource id: ${reservation.resourceId}`)
    }else{
        promises.push(Reservation.find(reservation.userId))
    }

    if (new Date(reservation.dateFrom).toString() === 'Invalid Date') {
        errors.push(`Invalid date: ${reservation.dateFrom}`)
    }

    if (new Date(reservation.dateTo).toString() === 'Invalid Date') {
        errors.push(`Invalid date: ${reservation.dateTo}`)
    }


};

module.exports = Reservation;