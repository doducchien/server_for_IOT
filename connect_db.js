const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '22061999',
    database: process.env.DB_NAME || 'group2',
    port: process.env.DB_PORT || '3307'
})

module.exports = db;