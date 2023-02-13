import {
  getFoods,
  getFoodById,
  insertFood,
  updateFoodById,
  deleteFoodById,
} from "../models/productModel";

let showFoods = (req, res) => {
  getFoods((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

let showFoodById = (req, res) => {
  getFoodById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

let createFood = (req, res) => {
  const data = req.body;
  insertFood(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

let updateFood = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateFoodById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

let deleteFood = (req, res) => {
  const id = req.params.id;
  deleteFoodById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  showFoods,
  showFoodById,
  createFood,
  updateFood,
  deleteFood,
};
