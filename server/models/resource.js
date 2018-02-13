const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema(
    {
        name: {
            type: String,
            index: {
                unique: true
            }
        },
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now},
    },
    {
        versionKey: false
    }
);

module.exports =  mongoose.model('Resource', resourceSchema);