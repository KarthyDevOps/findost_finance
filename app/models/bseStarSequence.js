const mongoose = require("mongoose");
const moment = require("moment");

const bseStarSequenceSchema = new mongoose.Schema(
  {
    sequenceNumber: {
      type: Number,
      trim: true,
    },
    date: {
      type: Date,
      trim: true,
      get(value) {
        return moment(value).format("YYYY-MM-DD");
      },
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);


const bseStarSequence = mongoose.model("bseStarSequence", bseStarSequenceSchema);
module.exports = { bseStarSequence };
