import { insertBooking } from "../models/bookingModel";

let createBooking = (req, res) => {
  const data = req.body;
  insertBooking(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

module.exports = { createBooking };
