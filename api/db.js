// db.js
import mysql from 'mysql2/promise';
// import env for dotenv
import 'dotenv/config';

// init dotenv
const env = process.env;

console.log(`Env user is: ${env.MYSQL_USER}`);

const pool = mysql.createPool({
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  port: env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;