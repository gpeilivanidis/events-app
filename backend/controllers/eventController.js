const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')

//@desc Create Event
//@route POST /api/events
//@access Private
const createEvent = asyncHandler(async (req, res) => {
    const { title, description, date, location, price, picture, tags } = req.body
    
    if(!req.user){
        res.status(400)
        throw new Error('must be logged in to create event')
    }

    //location = [lat, lon]
    if (!title || !date || !tags || !location || location.length !== 2){
        res.status(400)
        throw new Error('Please add a title, a date, a location and a tag')
    } 

    const event = await Event.create({
        title,
        description,
        date,
        location,
        price,
        picture,
        author: req.user._id,
        tags
    })

    if(event){
        res.status(201).json(event)
    } else {
        res.status(400)
        throw new Error('Something went wrong, event was not created')
    }
})

//@desc Get Events
//@route GET /api/events
//@access Public
const getEvents = asyncHandler(async (req, res) => {
    const { searchQuery } = req.body

    if(!searchQuery){
        const searchResults = await Event.find({active: true}).sort({date: 1})
        res.status(201).json(searchResults)
    } else {
        const searchResults = await Event.find({
            active: true,
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
                { price: { $regex: searchQuery, $options: "i" } },
                { tags: { $regex: searchQuery, $options: "i" } }
            ]
        }).sort({date: 1})

        res.status(201).json(searchResults)
    }
})

//@desc Update Event
//@route PUT /api/events/:id
//@access Private
const updateEvent = asyncHandler(async (req, res) => {

    const { title, description, date, location, price, picture, tags, active } = req.body
    
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error('Event does not exist')
    }

    if(req.user.id != event.author){
        res.status(400)
        throw new Error('Not authorized')
    }

    //events that are old, must be inactive
    if(date < new Date()){
        active = false
    }

    const updatedValues = {
        title,
        description,
        date,
        location,
        price,
        picture,
        tags,
        active
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedValues, {new: true})

    if(updatedEvent){
        res.status(200).json(updatedEvent)
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

//@desc Delete Event
//@route DELETE /api/events/:id
//@access Private
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error('Event not found')
    }

    if(req.user.id != event.author){
        res.status(400)
        throw new Error('not authorized')
    }

    await Event.findByIdAndDelete(req.params.id)

    res.status(200).json({message: `${req.params.id} successfully deleted`})
})

module.exports = {
    createEvent,
    getEvents,
    updateEvent,
    deleteEvent
}
