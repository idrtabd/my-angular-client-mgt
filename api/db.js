// db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'centerbeam.proxy.rlwy.net',
  user: 'root',
  password: 'FBbspoNtiGnJUBCSuYPMwTJzdVVHkzHJ', 
  database: 'railway',
  port: 11931,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;