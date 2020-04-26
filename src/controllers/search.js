const searchModels = require('../models/search')
const helper = require('../helpers')

module.exports = {
    searchBooks: async function(request, response){
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

            const search = `%${request.query.search}%`
            const result = await searchModels.searchBooks(search, start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    }
}