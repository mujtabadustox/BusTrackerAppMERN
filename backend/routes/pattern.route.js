let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const axios = require("axios");
// pattern Model
let patternSchema = require("../models/pattern");
// CREATE pattern

const getpatterns = async () => {
  const patternsList = [];
  const key = "ujAhaYu9dy6TAF2VgMLWK5nnV";
  const response = await axios.get(
    `https://ctabustracker.com/bustime/api/v2/getpatterns?key=${key}&rt=20&pid=954&format=json`
  );
  const newResponse = response["data"]["bustime-response"]["ptr"];
  newResponse.map((item) => {
    patternsList.push(item);
  });
  //   const collections = patternSchema.insertMany(patternsList);
};
getpatterns();

router.route("/create-pattern").post((req, res, next) => {
  patternSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ patterns
router.route("/show-patterns").get((req, res, next) => {
  patternSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single pattern
router.route("/show-pattern/:id").get((req, res, next) => {
  patternSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update pattern
router.route("/update-pattern/:id").put((req, res, next) => {
  patternSchema.findByIdAndUpdate(
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
        console.log("pattern updated successfully !");
      }
    }
  );
});
// Delete pattern
router.route("/delete-pattern/:id").delete((req, res, next) => {
  patternSchema.findByIdAndRemove(req.params.id, (error, data) => {
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
