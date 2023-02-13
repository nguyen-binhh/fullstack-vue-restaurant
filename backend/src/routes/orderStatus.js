import express from "express";
import orderStatusCtrl from "../controller/orderStatusCtrl";
const router = express.Router();

const Api = "/api/v1";

let initOrderStatusRoute = (app) => {
  router.get("/orderStatus/new", orderStatusCtrl.showNewestStatusId);
  router.get("/orderStatus/user/:id", orderStatusCtrl.getAllOrdersByUser);
  router.get("/orderStatus/order/:id", orderStatusCtrl.getAllOrdersByOrder);
  router.get("/orderStatus", orderStatusCtrl.getAllOrders);

  router.put("/orderStatus/:id", orderStatusCtrl.updateOrderStatus);
  router.put("/orderStatus/paid/:id", orderStatusCtrl.updateOrderPaid);
  router.put("/orderStatus/cancel/:id", orderStatusCtrl.cancelOrderStatus);

  router.post("/orderStatus", orderStatusCtrl.createOrderStatus);

  app.use(`${Api}`, router);
};

module.exports = initOrderStatusRoute;
