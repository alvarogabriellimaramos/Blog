const mongoose = require('mongoose');

const SchemaToken = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('TokensInvalidos',SchemaToken);