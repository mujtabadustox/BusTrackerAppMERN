let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const axios = require("axios");
// stops Model
let stopsSchema = require("../models/stops");
// CREATE stops

const getStops = async () => {
  const stopsList = [];
  const key = "ujAhaYu9dy6TAF2VgMLWK5nnV";
  const response = await axios.get(
    `https://ctabustracker.com/bustime/api/v2/getstops?key=${key}&rt=7&dir=Eastbound&format=json`
  );
  const newResponse = response["data"]["bustime-response"]["stops"];
  newResponse.map((item) => {
    stopsList.push(item);
  });
  //const collections = stopsSchema.insertMany(stopsList);
};
getStops();

router.route("/create-stops").post((req, res, next) => {
  stopsSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ stops
router.route("/show-stops").get((req, res, next) => {
  stopsSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single stops
router.route("/show-stops/:id").get((req, res, next) => {
  stopsSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update stops
router.route("/update-stops/:id").put((req, res, next) => {
  stopsSchema.findByIdAndUpdate(
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
        console.log("stops updated successfully !");
      }
    }
  );
});
// Delete stops
router.route("/delete-stops/:id").delete((req, res, next) => {
  stopsSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
