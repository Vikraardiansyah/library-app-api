const express = require('express')
const Route = express.Router()

const {authentication} = require('../middleware/auth')

const sortController = require('../controllers/sort')

Route
    .get('/', authentication, sortController.sortBooks)

module.exports = Route