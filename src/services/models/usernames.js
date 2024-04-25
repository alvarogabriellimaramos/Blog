const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    notification: [{messagem: String}]
});

module.exports = mongoose.model('usernames',Schema);
