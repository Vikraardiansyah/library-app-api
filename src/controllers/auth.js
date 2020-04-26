const authModel = require('../models/auth')
const helper = require('../helpers')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {authRefreshToken} = require('../middleware/auth')
require('dotenv').config()

module.exports = {
    postUser: async function (request, response) {
        try {

            const setData = request.body
            const password = setData.password
            const hash = bcrypt.hashSync(password, 10)
            setData.password = hash

            const result = await authModel.postUser(setData)

             helper.response(response, 200, result)
        } catch (error) {
            helper.response(response, 500, {message: "Email already exist!"})
        }
    },
    postLogin: async function (request, response) {
        try {
            const getData = request.body
            const password = getData.password

            const result = await authModel.postLogin(getData)
            const validatedPassword = result.password
            
                    if(bcrypt.compareSync(password, validatedPassword)){
                        delete result.password
                        const token = jwt.sign({result}, process.env.TOKEN_SECRET, {expiresIn: '20s'}) //token primary
                        const refreshToken = jwt.sign({result}, process.env.REFRESH_TOKEN_SECRET)//refresh token
                        const newData = {
                            ...result,
                            token,
                            refreshToken
                        }
                        delete newData.password
                        helper.response(response, 200, newData)
                    } else {
                        helper.response(response, 500, {message: "Invalid email or password"})
                    }
        } catch (error) {
            helper.response(response, 500, {message: "Invalid email or password"})
        }
    },
    postToken: async function (request, response){
        try {
            const token = request.body.token

            const result = await authModel.postToken(token)
            if (result === undefined){
                helper.response(response, 500, {message: "Invalid email or password"})
            } else {
                const token = jwt.sign({result}, process.env.TOKEN_SECRET, {expiresIn: '1h'}) //token primary
                helper.response(response, 200, {token: token})
            }
        } catch (error) {
            helper.response(response, 500, error)
        }
    }
}
