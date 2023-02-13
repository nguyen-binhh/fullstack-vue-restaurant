import express from "express";
import bookingCtrl from "../controller/bookingCtrl";
const router = express.Router();

const Api = "/api/v1";

let initBookingRoute = (app) => {
  router.post("/booking", bookingCtrl.createBooking);

  app.use(`${Api}`, router);
};

module.exports = initBookingRoute;
