const express = require('express')
const Route = express.Router()
const cors = require('cors')
const {authentication, authorization} = require('../middleware/auth')
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}

const statusController = require('../controllers/status')

Route
    .get('/', cors(corsOptions), authentication, authorization, statusController.getStatus)
    .post('/', cors(corsOptions), authentication, authorization, statusController.postStatus)
    .put('/:id', cors(corsOptions), authentication, authorization, statusController.putStatus)
    .delete('/:id', cors(corsOptions), authentication, authorization, statusController.deleteStatus)

module.exports = Route