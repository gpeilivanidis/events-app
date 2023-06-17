const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register
// @route POST /api/users/
// @access Public
const register = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body

    if(!email || !password || !name){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('Email used by another user')
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassoword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        name,
        password: hashedPassoword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

// @desc Login
// @route POST /api/users/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    if(!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// generate jwt
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    register,
    login,
}
