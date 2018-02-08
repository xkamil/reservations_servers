const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: String,
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {
        versionKey: false
    }
);

module.exports =  mongoose.model('User', userSchema);