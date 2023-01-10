const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let stopsSchema = new Schema(
  {
    stpid: {
      type: String,
    },
    stpnm: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Stop", stopsSchema);
