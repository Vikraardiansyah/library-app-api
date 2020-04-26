const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const cors = require('cors')
const morgan = require('morgan')
const routeNavigator = require('./src/index')

const server = app.listen(3000, "127.0.0.1", function(){
    const host = server.address().address
    const port = server.address().port

    console.log("You're connected at "+host+":"+port)
})
// app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', routeNavigator)
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });