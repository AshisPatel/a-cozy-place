const mongoose = require('mongoose');
const { Schema } = mongoose; 

const soundMixSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    sounds: [{
        type: Schema.Types.ObjectId,
        ref: 'Sound'
    }]
});

module.exports = soundMixSchema; 