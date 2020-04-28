const express = require('express')
const Route = express.Router()
const {authentication} = require('../middleware/auth')

const userController = require('../controllers/user')

Route
    .get('/', authentication, userController.userGetBooks)
    .put('/:id', authentication, userController.userPutBooks)

module.exports = Route