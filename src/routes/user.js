const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

const userController = require('../controllers/user')

Route
    .get('/', cors(corsOptions), authentication, userController.userGetBooks)
    .put('/:id', cors(corsOptions), authentication, userController.userPutBooks)

module.exports = Route