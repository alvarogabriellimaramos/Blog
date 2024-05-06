const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: 'undefined'
    },
    notification: [
        {
            messagem: String
        },
        {
            date: Date
        }
    ]
});

module.exports = mongoose.model('notification',Schema);
