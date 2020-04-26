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
            const limit = parseInt(request.query.limit)
            const start = (parseInt(request.query.page) - 1) * limit
            const page = parseInt(request.query.page)
            const pagination = {
                "page" : page,
                "limit" : limit
            }
            
            const result = await bookModels.getBooks(start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    postBooks: async function(request, response){
        try {
            const setData = request.body
            setData.image = request.file.filename
            const result = await bookModels.postBooks(setData)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    putBooks: async function(request, response){
        try {
            const setData = request.body
            setData.image = request.file.filename
            const id = request.params.id
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