const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Maochamnol123!',
    database : 'to_do_list',
});

module.exports = pool;