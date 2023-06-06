const express = require('express')
const router = express.Router()
const { getMe, register, login } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/me', protect, getMe)
router.post('/', register)
router.post('/login', login)

module.exports = router
