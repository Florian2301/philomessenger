const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const TitleSchema = new Schema({
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
})

module.exports = Title = mongoose.model('title', TitleSchema)