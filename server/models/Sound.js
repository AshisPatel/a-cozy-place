const mongoose = require('mongoose');
const { Schema } = mongoose; 

const soundSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
    },
    audio: {
        type: String
    }
});

const Sound = mongoose.model('Sound', soundSchema);

module.exports = Sound; 
