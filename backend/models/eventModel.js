const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    location: {
        // [lat, lon]
        type: [Number],
        required: [true, 'Please add a location']
    },
    price: {
        type: String,
        default: 'free'
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tags: {
        type: [String],
        required: [true, 'Please add at least one tag']
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)
