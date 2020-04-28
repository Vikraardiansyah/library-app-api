const express = require('express')
const Route = express.Router()
const {authentication, authorization} = require('../middleware/auth')


const statusController = require('../controllers/status')

Route
    .get('/', authentication, authorization, statusController.getStatus)
    .post('/', authentication, authorization, statusController.postStatus)
    .put('/:id', authentication, authorization, statusController.putStatus)
    .delete('/:id', authentication, authorization, statusController.deleteStatus)

module.exports = Route