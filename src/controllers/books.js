const bookModels = require('../models/books')
const helper = require('../helpers')

module.exports = {
    getBooks: async function(request, response){
        try {
            if(request.query.page === undefined){
                request.query.page = 1
            }

            if(request.query.limit === undefined) {
                request.query.limit = 4
            }
            if(request.query.sort === "false") {
                request.query.sort = "DESC"
            } else {
                request.query.sort = "ASC"
            }
            if(request.query.value === undefined){
                request.query.value = "books.id"
            }
            const data = await bookModels.getCountBooks()
            const totalData = data[0]['COUNT(*)']
            const value = request.query.value
            const sort = request.query.sort
            const limit = parseInt(request.query.limit)
            const start = (parseInt(request.query.page) - 1) * limit
            const page = parseInt(request.query.page)
            const totalPage = Math.ceil(totalData/limit)
            const pagination = {
                "totalPage" : totalPage,
                "totalData" : totalData,
                "page" : page,
                "limit" : limit
            }
            
            const result = await bookModels.getBooks(value, sort, start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    postBooks: async function(request, response){
        try {
            const setData = request.body
            setData.image = request.file.filename
            console.log(request.file)
            if(request.file.size > 1*1024*1024) {
                return helper.response(response, 500, {"message": "File too large"})
            }
            const result = await bookModels.postBooks(setData)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    putBooks: async function(request, response){
        try {
            const id = request.params.id
            const setData = request.body
            if(request.file) {
                setData.image = request.file.filename
            }

            const result = await bookModels.putBooks(setData, id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    deleteBooks: async function(request, response){
        try {
            const id = request.params.id
            console.log(request.body)
            const result = await bookModels.deleteBooks(id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    }
}