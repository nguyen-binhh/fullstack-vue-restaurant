import {
  getNewestId,
  insertOrderStatus,
  getOrdersByUser,
  getOrdersByOrder,
  getAll,
  updateStatus,
  updatePaid,
  cancelStatus,
} from "../models/orderStatusModel";

// get newest Order Status
let showNewestStatusId = (req, res) => {
  getNewestId((err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// get orders status
let getAllOrdersByUser = (req, res) => {
  getOrdersByUser(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// get orders in orders
let getAllOrdersByOrder = (req, res) => {
  getOrdersByOrder(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// get all orders
let getAllOrders = (req, res) => {
  getAll((err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// update status
let updateOrderStatus = (req, res) => {
  updateStatus(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// update Paid
let updateOrderPaid = (req, res) => {
  updatePaid(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// cancel status
let cancelOrderStatus = (req, res) => {
  cancelStatus(req.params.id, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// create order status
let createOrderStatus = (req, res) => {
  const data = req.body;
  insertOrderStatus(data, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  showNewestStatusId,
  getAllOrdersByUser,
  getAllOrdersByOrder,
  getAllOrders,
  updateOrderStatus,
  updateOrderPaid,
  cancelOrderStatus,
  createOrderStatus,
};
