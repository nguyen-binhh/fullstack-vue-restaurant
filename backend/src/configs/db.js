// import mysql from "mysql2";

// // create the connection to database

// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "database-restaurant",
// });

// db.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// export default db;
// get the client
import mysql from "mysql2/promise";

// create the connection to database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "database-restaurant",
});

// simple query
// const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'test'});

export default db;
