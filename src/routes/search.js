const express = require('express')
const Route = express.Router()
const {authentication} = require('../middleware/auth')

const searchController = require('../controllers/search')

Route
    .get('/', authentication, searchController.searchBooks)

module.exports = Route