const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'RUSHI123@MariaDB',
    database: 'printsone_db',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ MariaDB Connection Failed');
        console.error(err.message);
    } else {
        console.log('✅ MariaDB Connected Successfully');
    }
});

module.exports = db;