const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication, authorization} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

const authorController = require('../controllers/author')


Route
    .get('/', cors(corsOptions), authentication, authorization, authorController.getAuthor)
    .post('/', cors(corsOptions), authentication, authorization, authorController.postAuthor)
    .put('/:id', cors(corsOptions), authentication, authorization, authorController.putAuthor)
    .delete('/:id', cors(corsOptions), authentication, authorization, authorController.deleteAuthor)

module.exports = Route