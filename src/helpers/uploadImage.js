const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, './src/uploads/')
    },
    filename: function (request, file, callback) {
      const fileExtension = file.originalname.split('.')[1]
      callback(null, file.fieldname + "-" + Date.now() + "." + fileExtension)
    }
})

const upload = multer({
    storage: storage,
    limits : {fileSize: 1*1024*1024},
    fileFilter: function (request, file, callback){
        
        checkFileType(file, callback)
    }
}).single('image')

function checkFileType(file, callback){
    const fileTypes = /jpg|jpeg|png/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if(extName && mimeType){
        return callback(null, true)
    } else {
        callback('Error: Image only!', false)
    }
}


module.exports = upload