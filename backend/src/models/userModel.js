// import connection
import db from "../configs/db";

// get all user
const getAllUser = (result) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// get single user
const getUserByEmail = (data, result) => {
  db.query(
    "SELECT user_id, user_name, user_password FROM user WHERE user_email = ?",
    [data],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

// insert User
const insertUser = (data, result) => {
  db.query("INSERT INTO user SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

module.exports = { getAllUser, getUserByEmail, insertUser };
