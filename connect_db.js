const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '22061999',
    database: process.env.DB_NAME || 'group2',
    port: process.env.DB_PORT || '3306'
})

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   console.log('connected as id ' + db.threadId);
  });

module.exports = db;