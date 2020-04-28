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
            if(request.query.sort === "false") {
                request.query.sort = "DESC"
            } else {
                request.query.sort = "ASC"
            }
            if(request.query.value === undefined){
                request.query.value = "books.title"
            }
            const value = request.query.value
            const sort = request.query.sort
            const limit = parseInt(request.query.limit)
            const start = (parseInt(request.query.page) - 1) * limit
            const page = parseInt(request.query.page)
            const search = `%${request.query.search}%`

            const data = await searchModels.getCountBooks(search, value, sort, start, limit)
            const totalData = data[0]['COUNT(*)']
            const totalPage = Math.ceil(totalData/limit)
            const pagination = {
                "totalPage" : totalPage,
                "totalData" : totalData,
                "page" : page,
                "limit" : limit
            }

            
            const result = await searchModels.searchBooks(search, value, sort, start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    }
}