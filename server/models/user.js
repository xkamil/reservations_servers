const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            match: /^.+@pega\.com$/
        },
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', schema);