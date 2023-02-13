import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
require("dotenv").config();

import initFoodRoute from "./routes/products";
import initUserRoute from "./routes/users";
import initCartRoute from "./routes/carts";
import initBookingRoute from "./routes/booking";
import initOrderDetailRoute from "./routes/orderDetail";
import initOrderStatusRoute from "./routes/orderStatus";

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors({ origin: true }));

// routes
initFoodRoute(app);
initUserRoute(app);
initBookingRoute(app);
initOrderDetailRoute(app);
initOrderStatusRoute(app);
initCartRoute(app);

app.get("/", function (req, res) {
  res.json({ message: "Welcome to restaurant api" });
});

let port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server node Starting in ${port}`);
});
