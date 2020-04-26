const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
const sortController = require('../controllers/sort')

Route
    .get('/', cors(corsOptions), authentication, sortController.sortBooks)

module.exports = Route