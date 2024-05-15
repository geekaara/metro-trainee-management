const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

(async () => {
  try {
    const [rows, fields] = await db.query("SELECT 1 + 1 AS solution");
    console.log("The solution is: ", rows[0].solution);
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
})();
