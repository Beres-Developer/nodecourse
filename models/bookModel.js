const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

const bookModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookModel);