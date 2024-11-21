const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // ganti dengan username MySQL Anda
    password: '',  // ganti dengan password MySQL Anda
    database: 'kebunbintatang' // nama database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;
