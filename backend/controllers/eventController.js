const mongoose = require('mongoose')
const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')

//@desc Create Event
//@route POST /api/events
//@access Private
const createEvent = asyncHandler(async (req, res) => {
    const { title, date, location } = req.body
    
    if(!req.user){
        res.status(400)
        throw new Error('must be logged in to create event')
    }
    
    // location = {
    //      address,
    //      [lat,lon]
    // }
    if (!title || !date || !location ){
        res.status(400)
        throw new Error('Please add a title, a date, a location')
    } 

    const event = await Event.create({
        title,
        date,
        location,
        author: req.user._id,
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
    // get request sends data in req.query
    const { searchQuery } = req.query

    if(!searchQuery){
        const searchResults = await Event.find().sort({date: 1})
        res.status(201).json(searchResults)
    } else {
        const searchResults = await Event.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { location: { $regex: searchQuery, $options: "i" } }
            ]
        }).sort({date: 1})

        res.status(201).json(searchResults)
    }
})

//@desc Get my events
//@route GET /api/events/myEvents
//@access Private
const getMyEvents = asyncHandler(async (req, res) => {

    const events = await Event.find({author: req.user.id}).sort({createdAt: 1})
    res.status(200).json(events)
})

//@desc Get event
//@route GET /api/events/:id
//@access Public
const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
    res.status(200).json(event)
})

//@desc Update Event
//@route PUT /api/events/:id
//@access Private
const updateEvent = asyncHandler(async (req, res) => {

    const { title, date, location } = req.body
    
    const event = await Event.findById(req.params.id)

    if(!event){
        res.status(400)
        throw new Error('Event does not exist')
    }

    if(req.user.id != event.author){
        res.status(400)
        throw new Error('Not authorized')
    }

    const updatedValues = {
        title,
        date,
        location
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

    res.status(200).json({id: req.params.id})
})

module.exports = {
    createEvent,
    getEvent,
    getEvents,
    getMyEvents,
    updateEvent,
    deleteEvent,
}
