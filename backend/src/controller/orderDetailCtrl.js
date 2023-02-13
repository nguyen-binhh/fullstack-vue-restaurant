import {
  insertOrderDetails,
  getOrderDetails,
} from "../models/orderDetailModel";

// create order details
let getOrderDetailsById = (req, res) => {
  const data = req.body;
  insertOrderDetails(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

let createOrderDetails = (req, res) => {
  getOrderDetails(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

module.exports = { getOrderDetailsById, createOrderDetails };
