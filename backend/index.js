let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
// Express Route
const vehicleRoute = require("../backend/routes/vehicle.route");
const routesRoute = require("../backend/routes/routes.route");
const directionsRoute = require("../backend/routes/direction.route");
const stopsRoute = require("../backend/routes/stops.route");
const patternsRoute = require("../backend/routes/pattern.route");
// Connecting mongoDB Database

mongoose
  .connect("mongodb://127.0.0.1:27017/trackerApp")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
const app = express();
app.use(express.json());
app.use(cors());
app.use("/vehicles", vehicleRoute);
app.use("/routes", routesRoute);
app.use("/directions", directionsRoute);
app.use("/stops", stopsRoute);
app.use("/patterns", patternsRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// 404 Error
app.use((req, res, next) => {
  next(Error(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
