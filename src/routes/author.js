const express = require('express')
const Route = express.Router()
const {authentication, authorization} = require('../middleware/auth')

const authorController = require('../controllers/author')


Route
    .get('/', authentication, authorization, authorController.getAuthor)
    .post('/', authentication, authorization, authorController.postAuthor)
    .put('/:id', authentication, authorization, authorController.putAuthor)
    .delete('/:id', authentication, authorization, authorController.deleteAuthor)

module.exports = Route