const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'libraryapp_api'
});

connection.connect(function(error){
    if(error) throw error
    console.log('Database has connected.')
})
module.exports = connection