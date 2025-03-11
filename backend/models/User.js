const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        required: true,
        unique: true,
        type: String,
        match: [
            /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
            'Enter a valid email address'
        ]
    },

    password: {
        required: true,
        type: String
    },

    firstName: {
        required: true,
        type: String
    },

    lastName: {
        required: true,
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
