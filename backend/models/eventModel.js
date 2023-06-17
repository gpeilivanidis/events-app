const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    location: {
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        // [lat,lon]
        coordinates: [Number],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)
