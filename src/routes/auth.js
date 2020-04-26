const express = require('express')
const Route = express.Router()
const {authRefreshToken} = require('../middleware/auth')

const authController = require('../controllers/auth')

Route
    .post('/register', authController.postUser)
    .post('/login', authController.postLogin)
    .post('/token', authRefreshToken, authController.postToken)

module.exports = Route
