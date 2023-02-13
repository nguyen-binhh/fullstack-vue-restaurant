import {
  getAllItems,
  getAItem,
  insertToCart,
  updateCartItemQty,
  deleteItemInCart,
  deleteAllItemsByUser,
} from "../models/cartModel";

// get all Items
let allItems = (req, res) => {
  getAllItems(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// get a Item
let getItem = (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;
  getAItem(user_id, product_id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// add to cart
let addItems = (req, res) => {
  const data = req.body;
  insertToCart(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// update Item
let updateItem = (req, res) => {
  const data = req.body;
  updateCartItemQty(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// delete a item in cart
let deleteItem = (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;
  deleteItemInCart(user_id, product_id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// delete all items in cart
let deleteAllItems = (req, res) => {
  deleteAllItemsByUser(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  allItems,
  getItem,
  addItems,
  updateItem,
  deleteItem,
  deleteAllItems,
};
