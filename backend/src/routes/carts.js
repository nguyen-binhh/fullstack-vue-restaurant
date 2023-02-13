import express from "express";
import cartCtrl from "../controller/cartCtrl";
const router = express.Router();

const Api = "/api/v1";

let initCartRoute = (app) => {
  // add to cart
  router.post("/cartItem", cartCtrl.addItems);

  // get a item in cart
  router.get("/cartItem/:user_id/:product_id", cartCtrl.getItem);

  // get all items by user id
  router.get("/cartItem/:id", cartCtrl.allItems);

  // update item qty
  router.put("/cartItem", cartCtrl.updateItem);

  // delete a item in cart
  router.delete("/cartItem/:user_id/:product_id", cartCtrl.deleteItem);

  // delete All items in cart
  router.delete("/cartItem/:id", cartCtrl.deleteAllItems);

  app.use(`${Api}`, router);
};

module.exports = initCartRoute;
