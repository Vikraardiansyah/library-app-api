const connection = require('../config/mysql')

module.exports = {
    userGetBooks: function(start, limit){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT books.id, books.title, books.description, genre.genre, author.author, status.status, books.image, books.updated_at, books.created_at FROM books INNER JOIN genre ON books.id_genre = genre.id INNER JOIN author ON books.id_author = author.id INNER JOIN status ON books.id_status = status.id LIMIT ${start},${limit}`, function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    userPutBooks: function(setData, id){
        return new Promise(function(resolve, reject){
            connection.query('UPDATE books SET id_status=? WHERE id=?', [setData.id_status, id], function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}