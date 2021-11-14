const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    taskContent: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        required: true
    }
});

module.exports = taskSchema; 