const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { boolean } = require("webidl-conversions");

let routeSchema = new Schema(
  {
    rt: {
      type: String,
    },
    rtnm: {
      type: String,
    },
    rtclr: {
      type: String,
    },
    rtdd: {
      type: String,
    },
    hdg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Route", routeSchema);
