import axios from 'axios'

const API_URL = '/api/events/'

const getEvents = async (searchQuery) => {
    // search query has to be an object property
    const response = await axios.get(API_URL, {searchQuery})
    return response.data
}

const getMyEvents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'myEvents', config)
    return response.data
}

const getEvent = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

const createEvent = async (eventData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, eventData, config)
    return response.data
}

const updateEvent = async (id, eventData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, eventData, config)
    return response.data
}

const deleteEvent = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const eventService = {
    getEvents,
    getMyEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}

export default eventService