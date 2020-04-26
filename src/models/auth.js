const connection = require('../config/mysql')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    postUser: function(setData) {
        return new Promise (function(resolve, reject) {
            connection.query('SELECT * FROM user WHERE email=?', setData.email, function (error, result){
                if (result[0]){
                    reject(new Error(error))
                } else {
                    connection.query('INSERT INTO user SET ?', setData, function (error, result){
                        if (!error){
                            const newResult = {
                                id: result.insertId,
                                ...setData
                            }
                            delete newResult.password
                            resolve(newResult)
                        } else {
                            reject(new Error(error))
                        }
                    })
                }
            })
        })
    },
    postLogin: function(getData) {
        return new Promise (function(resolve, reject) {
            connection.query('SELECT * FROM user WHERE email=?', getData.email, function(error, result) {
                if (!error){
                    resolve(result[0])
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    postToken: function(token) {
        return new Promise (function(resolve, reject) {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function (error, result) {
                if (error && error.name === "TokenExpiredError" || error && error.name === "JsonWebTokenError") {
                    reject(new Error(error))
                } else {
                    resolve(result.result)
                }
            })
        })
    }
}