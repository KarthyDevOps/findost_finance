const mongoose = require("mongoose");
const moment = require("moment");

const ipoSchema = new mongoose.Schema(
  {
    APId: {
      type: String,
    },
    applicationNumber: {
      type: String,
    },
    category: {
      type: String,
    },
    clientName: {
      type: String,
    },
    depository: {
      type: String,
    },
    dpId: {
      type: String,
    },
    clientBenId: {
      type: String,
    },
    nonASBA: {
      type: String,
    },
    pan: {
      type: String,
    },

    referenceNumber: {
      type: String,
    },
    allotmentMode: {
      type: String,
    },

    upiFlag: {
      type: String,
    },
    upi: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    subBrokerCode: {
      type: String,
    },
    status: {
      type: String,
    },
    bids: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const IPO = mongoose.model("ipo", ipoSchema);
module.exports = { IPO };
