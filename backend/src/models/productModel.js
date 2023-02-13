import db from "../configs/db";

// get all food
const getFoods = (product) => {
  db.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.log(err);
      product(err, null);
    } else {
      product(null, results);
    }
  });
};

// get single food
const getFoodById = (id, product) => {
  db.query(
    "SELECT * FROM product WHERE product_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        product(err, null);
      } else {
        product(null, results[0]);
      }
    }
  );
};

// insert Food
const insertFood = (data, result) => {
  db.query("INSERT INTO product SET ?", data, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
};

// update Food
const updateFoodById = (data, id, result) => {
  db.query(
    "UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?",
    [data.product_name, data.product_price, id],
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

// delete Food
const deleteFoodById = (id, result) => {
  db.query("DELETE FROM product WHERE product_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

module.exports = {
  getFoods,
  getFoodById,
  insertFood,
  updateFoodById,
  deleteFoodById,
};
