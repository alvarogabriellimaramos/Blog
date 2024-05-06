const mongoose = require('mongoose');

const SchemaPost = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    id: {
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
            body: {
                type: String,
                required: true
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
                comment: String,
                date: {
                    type: Date,
                    default: new Date().toISOString()
                },
                response: [{
                    username: String,
                    comment:String,
                    date: {
                        type: Date,
                        default: new Date().toISOString()
                    }
                }]
            }]
        }
    ]
});

module.exports = mongoose.model('Post',SchemaPost);