let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const axios = require("axios");
// route Model
let routeSchema = require("../models/routes");
// CREATE route

const getRoutes = async () => {
  const stopsList = [];
  const key = "ujAhaYu9dy6TAF2VgMLWK5nnV";
  const response = await axios.get(
    `http://ctabustracker.com/bustime/api/v2/getroutes?key=${key}&format=json`
  );
  const newResponse = response["data"]["bustime-response"]["routes"];
  newResponse.map((item) => {
    stopsList.push(item);
  });
  //   const collections = routeSchema.insertMany(stopsList);
};
getRoutes();

router.route("/create-route").post((req, res, next) => {
  routeSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ routes
router.route("/show-routes").get((req, res, next) => {
  routeSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single route
router.route("/show-route/:id").get((req, res, next) => {
  routeSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update route
router.route("/update-route/:id").put((req, res, next) => {
  routeSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("route updated successfully !");
      }
    }
  );
});
// Delete route
router.route("/delete-route/:id").delete((req, res, next) => {
  routeSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});
module.exports = router;
