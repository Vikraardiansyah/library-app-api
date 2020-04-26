const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

const searchController = require('../controllers/search')

Route
    .get('/', cors(corsOptions), authentication, searchController.searchBooks)

module.exports = Route