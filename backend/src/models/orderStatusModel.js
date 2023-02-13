// import connection
import db from "../configs/db";

// get newest order Status
const getNewestId = (result) => {
  db.query(
    "SELECT order_id FROM orderstatus ORDER BY order_id DESC LIMIT 0, 1",
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

// insert order Status
const insertOrderStatus = (data, result) => {
  db.query("INSERT INTO orderstatus SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// get all orders Status
const getOrdersByUser = (id, result) => {
  db.query(
    "SELECT * FROM orderstatus WHERE user_id = ?",
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

// get all Orders Status
const getOrdersByOrder = (id, result) => {
  db.query(
    "SELECT * FROM orderstatus WHERE order_id = ?",
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

// get all orders Status
const getAll = (result) => {
  db.query("SELECT * FROM orderstatus", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

const updateStatus = (id, result) => {
  db.query(
    "UPDATE orderstatus SET order_status = order_status + 1  WHERE order_id = ?",
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

const updatePaid = (id, result) => {
  db.query(
    "UPDATE orderstatus SET order_paid = 'true' WHERE order_id = ?",
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

const cancelStatus = (id, result) => {
  db.query(
    "UPDATE orderstatus SET order_status = 0  WHERE order_id = ?",
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
  db.query(
    "UPDATE orderstatus SET order_paid = 'false' WHERE order_id = ?",
    id,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      }
    }
  );
};

module.exports = {
  getNewestId,
  insertOrderStatus,
  getOrdersByUser,
  getOrdersByOrder,
  getAll,
  updateStatus,
  updatePaid,
  cancelStatus,
};
