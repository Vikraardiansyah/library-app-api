const express = require('express')
const Route = express.Router()
const cors = require('cors')
const multer  = require('multer')
const bookController = require('../controllers/books')
const {authentication, authorization} = require('../middleware/auth')
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, './src/uploads/')
    },
    filename: function (request, file, callback) {
      const fileExtension = file.originalname.split('.')[1]
      callback(null, file.fieldname + "-" + Date.now() + "." + fileExtension)
    }
})
const upload = multer({storage: storage})
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}



Route
    .get('/', cors(corsOptions), authentication,  bookController.getBooks)
    .post('/', cors(corsOptions), authentication, authorization, upload.single('image'), bookController.postBooks)
    .put('/:id', cors(corsOptions), authentication, authorization, upload.single('image'), bookController.putBooks)
    .delete('/:id', cors(corsOptions), authentication, authorization, bookController.deleteBooks)

module.exports = Route