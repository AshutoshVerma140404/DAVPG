const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:     process.env.DB_PORT,
  // enable running multiple SQL statements in one query
  multipleStatements: true
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to Railway MySQL!');
});

module.exports = db;
