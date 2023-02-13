import express from "express";
import userCtrl from "../controller/userCtrl";

const router = express.Router();

const Api = "/api/v1";

let initUserRoute = (app) => {
  // all users
  router.get("/users", userCtrl.allUsers);

  // get  user
  router.get("/users/:email", userCtrl.showUser);

  // create account
  router.post("/users", userCtrl.createAccount);

  app.use(`${Api}`, router);
};

module.exports = initUserRoute;
