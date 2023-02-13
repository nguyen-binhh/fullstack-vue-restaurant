import express from "express";
import productCtrl from "../controller/productCtrl";

const Api = "/api/v1";
const router = express.Router();

let initFoodRoute = (app) => {
  // get all food
  router.get("/foods", productCtrl.showFoods);

  // get single Food
  router.get("/foods/:id", productCtrl.showFoodById);

  // create Food
  router.post("/foods", productCtrl.createFood);

  // update Food
  router.put("/foods/:id", productCtrl.updateFood);

  // delete Food
  router.delete("/foods/:id", productCtrl.deleteFood);

  app.use(`${Api}`, router);
};

module.exports = initFoodRoute;
