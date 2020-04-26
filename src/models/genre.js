const connection = require('../config/mysql')

module.exports = {
    getGenre: function(){
        return new Promise(function(resolve, reject){
            connection.query("SELECT * FROM genre", function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    postGenre: function(setData){
        return new Promise(function(resolve, reject){
            connection.query("INSERT INTO genre SET ?", setData, function(error, result){
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
    putGenre: function(setData, id){
        return new Promise(function(resolve, reject){
            connection.query('UPDATE genre SET ? WHERE id=?', [setData, id], function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteGenre: function(id){
        return new Promise(function(resolve, reject){
            connection.query('DELETE FROM genre WHERE id=?', id, function(error, result){
                if(!error){
                    resolve(result)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}