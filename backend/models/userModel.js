const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    bio: {
        type: String,
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
