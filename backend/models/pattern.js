const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let patternsSchema = new Schema(
  {
    pid: {
      type: Number,
    },
    ln: {
      type: Number,
    },
    rtdir: {
      type: String,
    },
    pt: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Pattern", patternsSchema);
