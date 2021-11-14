const mongoose = require ('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const taskSchema = require('./Task');
const soundMixSchema = require('./SoundMix');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [taskSchema],
    soundMixes: [soundMixSchema],
    breakTime: {
        type: Number, 
        default: 0
    }
});

// setup middleware to encrypt password 
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 