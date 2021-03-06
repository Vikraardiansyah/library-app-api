const connection = require('../config/mysql')

module.exports = {
    getCountBooks: function(){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT COUNT(*) FROM books`, function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    getBooks: function(value, sort, start, limit){
        return new Promise(function(resolve, reject){
            connection.query(`SELECT books.id, books.title, books.description, books.id_genre, genre.genre, books.id_author, author.author, books.id_status, status.status, books.image, books.updated_at, books.created_at FROM books INNER JOIN genre ON books.id_genre = genre.id INNER JOIN author ON books.id_author = author.id INNER JOIN status ON books.id_status = status.id ORDER BY ${value} ${sort} LIMIT ${start},${limit}`, function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    postBooks: function(setData){
        return new Promise(function(resolve, reject){
            connection.query("INSERT INTO books SET ?", setData, function(error, result){
                if(!error){
                    const newData = {
                        id: result.insertId,
                        ...setData
                    }
                    resolve(newData)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    putBooks: function(setData, id){
        return new Promise(function(resolve, reject){
            connection.query('UPDATE books SET ? WHERE id=?', [setData, id], function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteBooks: function(id){
        return new Promise(function(resolve, reject){
            connection.query('DELETE FROM books WHERE id=?', id, function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}