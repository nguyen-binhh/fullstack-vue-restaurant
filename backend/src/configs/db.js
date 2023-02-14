import mysql from "mysql2";

// create the connection to database

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "database-restaurant",
});

db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

export default db;
