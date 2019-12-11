'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'phpmyadmin',
    password : '123456',
    database : 'tezos-crowdfunding-demo'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;