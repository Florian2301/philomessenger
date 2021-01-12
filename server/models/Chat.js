const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ChatSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    chatnumber: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    philosopher: [{
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    messages: [{
        messagenumber: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: false
        },
        tags: {
            type: Array,
            required: false
        },
        color: {
            type: Number,
            required: true
        }
    }]
})

module.exports = Chat = mongoose.model('chat', ChatSchema)