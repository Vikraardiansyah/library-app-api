const express = require('express')
const Route = express.Router()
const {authentication, authorization} = require('../middleware/auth')

const genreController = require('../controllers/genre')

Route
    .get('/', authentication, authorization, genreController.getGenre)
    .post('/', authentication, authorization, genreController.postGenre)
    .put('/:id', authentication, authorization, genreController.putGenre)
    .delete('/:id', authentication, authorization, genreController.deleteGenre)

module.exports = Route