import mysql from "mysql2";
require("dotenv").config();

// create the connection to database

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  connectTimeout: 30000,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;
