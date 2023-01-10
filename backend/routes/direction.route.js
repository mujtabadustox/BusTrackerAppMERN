let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const axios = require("axios");
// direction Model
let directionSchema = require("../models/directions");
// CREATE direction

const getDirections = async () => {
  const directionsList = [];
  const key = "ujAhaYu9dy6TAF2VgMLWK5nnV";
  const response = await axios.get(
    `http://ctabustracker.com/bustime/api/v2/getdirections?key=${key}&rt=20&format=json`
  );
  const newResponse = response["data"]["bustime-response"]["directions"];
  newResponse.map((item) => {
    directionsList.push(item);
  });
  //   const collections = directionSchema.insertMany(directionsList);
};
getDirections();

router.route("/create-direction").post((req, res, next) => {
  directionSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ directions
router.route("/show-directions").get((req, res, next) => {
  directionSchema.find((error, data) => {
    if (error) {
      return next(Error(404));
    } else {
      res.json(data);
    }
  });
});

// Get Single direction
router.route("/show-direction/:id").get((req, res, next) => {
  directionSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update direction
router.route("/update-direction/:id").put((req, res, next) => {
  directionSchema.findByIdAndUpdate(
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
        console.log("direction updated successfully !");
      }
    }
  );
});
// Delete direction
router.route("/delete-direction/:id").delete((req, res, next) => {
  directionSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
