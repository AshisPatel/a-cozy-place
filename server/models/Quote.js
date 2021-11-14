const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const quoteSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: 'A Kindred Spirit'
    }
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote; 