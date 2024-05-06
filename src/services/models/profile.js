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
    biografy: {
        type: String,
        default: 'Olá,bem vindo ao meu perfil'
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: new Date().toISOString()
    }
})

module.exports = mongoose.model('profile-users',Schema);