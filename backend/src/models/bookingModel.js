// import connection
import db from "../configs/db";

// insert Booking
const insertBooking = (data, result) => {
  db.query("INSERT INTO bookingtable SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

module.exports = { insertBooking };
