const sortModels = require('../models/sort')
const helper = require('../helpers')

module.exports = {
    sortBooks: async function(request, response){
        try {
            if(request.query.page === undefined){
                request.query.page = 1
            }

            if(request.query.limit === undefined) {
                request.query.limit = 4
            }

           
            if(request.query.sort == "desc") {
                request.query.sort = "DESC"
            } else {
                request.query.sort = "ASC"
            }
            const value = request.query.value
            const sort = request.query.sort
            const limit = parseInt(request.query.limit)
            const start = (parseInt(request.query.page) - 1) * limit
            const page = parseInt(request.query.page)
            const pagination = {
                "page" : page,
                "limit" : limit
            }
            
            const result = await sortModels.sortBooks(value, sort, start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    }
}