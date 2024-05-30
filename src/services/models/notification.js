const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    notification: [{messagem: String},{date: Date,default: Date.now}]
});

module.exports = mongoose.model('notification',Schema);
