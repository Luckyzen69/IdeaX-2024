const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['learner', 'educator', 'organizer'],
        default: 'user'
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;