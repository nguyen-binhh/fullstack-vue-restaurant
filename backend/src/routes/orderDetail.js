import express from "express";
import orderDetailCtrl from "../controller/orderDetailCtrl";
const router = express.Router();

const Api = "/api/v1";

let initOrderDetailRoute = (app) => {
  router.post("/orderdetails", orderDetailCtrl.createOrderDetails);
  router.get("/orderdetails/:id", orderDetailCtrl.getOrderDetailsById);

  app.use(`${Api}`, router);
};

module.exports = initOrderDetailRoute;
