import { getAllUser, getUserByEmail, insertUser } from "../models/userModel";

let allUsers = (req, res) => {
  getAllUser((err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

let showUser = (req, res) => {
  getUserByEmail(req.params.email, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// create account
let createAccount = async (req, res) => {
  const data = req.body;

  insertUser(data, (err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = { allUsers, showUser, createAccount };
