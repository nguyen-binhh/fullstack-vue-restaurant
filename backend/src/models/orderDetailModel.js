// import connection
import db from "../configs/db";

// insert Bill Details
const insertOrderDetails = (data, result) => {
  db.query("INSERT INTO orderdetails SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// get Bill Details
const getOrderDetails = (id, result) => {
  db.query(
    "SELECT * FROM orderdetails WHERE order_id = ?",
    id,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

module.exports = { insertOrderDetails, getOrderDetails };
