const mysql  = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'report_cs'
});

connection.connect(function(error){
    if (error) {
        console.log(error);
    } else {
        console.log('Connection Success!');
    }
});

module.exports = connection;