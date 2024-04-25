const mongoose = require('mongoose');

const SchemaPost = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    
    Posts: [
        {
            title: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: new Date().toISOString()
            },
            category: {
                type:String,
                required:false
            },
            text: {
                type:String,
                required:true
            },
            image: {
                type: String,
                required:false
            },
            like: { 
                type: Number,
                default:0 
            },
            comments: [{
                username: String,
                comment: String
            }]
        }
    ]
});

module.exports = mongoose.model('Post',SchemaPost);