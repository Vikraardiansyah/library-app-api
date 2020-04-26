const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication, authorization} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
const genreController = require('../controllers/genre')

Route
    .get('/', cors(corsOptions), authentication, authorization, genreController.getGenre)
    .post('/', cors(corsOptions), authentication, authorization, genreController.postGenre)
    .put('/:id', cors(corsOptions), authentication, authorization, genreController.putGenre)
    .delete('/:id', cors(corsOptions), authentication, authorization, genreController.deleteGenre)

module.exports = Route