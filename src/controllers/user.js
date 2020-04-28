const userModels = require('../models/user')
const helper = require('../helpers')

module.exports = {
    userGetBooks: async function(request, response){
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
            
            const result = await userModels.userGetBooks(start, limit)
            
            return helper.response(response, 200, result, pagination)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    },
    userPutBooks: async function(request, response){
        try {
            const setData = request.body
            const id = request.params.id
            const result = await userModels.userPutBooks(setData, id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }
    }
}