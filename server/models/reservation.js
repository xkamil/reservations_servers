const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        user: {
            type: String,
            required: true
        },
        resource: {
            type: String,
            required: true
        },
        dateFrom: {
            type: Number,
            required: true
        },
        dateTo: {
            type: Number,
            required: true
        },
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {
        versionKey: false
    }
);

const Reservation = mongoose.model('Reservation', schema);

schema.pre('save', function (next) {

    if (this.dateTo <= this.dateFrom) {
        return next({code: 501, message: 'dateTo must be greater than dateFrom'})
    }

    Reservation.findOne({
        resource: this.resource,
        $or: [
            {
                $and: [
                    {dateFrom: {$lte: this.dateFrom}},
                    {dateTo: {$gt: this.dateFrom}}
                ]
            },
            {
                $and: [
                    {dateFrom: {$lt: this.dateTo}},
                    {dateTo: {$gt: this.dateTo}}
                ]
            },
            {
                $and: [
                    {dateFrom: {$gt: this.dateFrom}},
                    {dateTo: {$lt: this.dateTo}}
                ]
            }
        ]

    }).then(res => {
        if (res) {
            return next({code: 502, message: 'Reservation already taken', reservation: res})
        } else {
            next();
        }
    });
});


module.exports = Reservation;