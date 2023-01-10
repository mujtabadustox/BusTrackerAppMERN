const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let directionSchema = new Schema(
  {
    dir: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Direction", directionSchema);
