const express = require("express") 
const router = express.Router()
const { protect } = require('../middleware/authMiddleware') 
const { getEvent, getEvents, createEvent,
    getMyEvents, updateEvent, deleteEvent 
} = require("../controllers/eventController")

router.route('/')
    .get(getEvents)
    .post(protect, createEvent)
router.get('/myEvents', protect, getMyEvents)
router.route('/:id')
    .get(getEvent)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent)

module.exports = router
