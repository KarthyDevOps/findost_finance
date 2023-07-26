const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const watchListSchema = new mongoose.Schema(
  {
   
    apId: {
        type: String,
    },
    schemeCode: {
      type: String,
    },
    schemeName: {
      type: String,
    },
    categoryCode: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    one_MONTHRET: {
      type: String,
    },
    three_MONTHRET: {
      type: String,
    },
    six_MONTHRET: {
      type: String,
    },
    one_YRRET: {
      type: String,
    },
    three_YEARRET: {
      type: String,
    },
    five_YEARRET: {
      type: String,
    },
    INCRET: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


const WatchList = mongoose.model("watchList", watchListSchema);
module.exports = { WatchList };
