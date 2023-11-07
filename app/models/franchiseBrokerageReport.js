const mongoose = require("mongoose");
const moment = require("moment");

const franchiseBrokerageReportSchema = new mongoose.Schema(
  {
    APId: {
      type: String,
    },
    ClientCode: {
      type: String,
    },
    ClientName: {
      type: String,
    },
    TradeDate: {
      type: Date,
      get(value) {
        return moment(value).format("YYYY-MM-DD");
      }
    },
    Exchange: {
      type: String,
    },
    Segment: {
      type: String,
    },
    TotalBrok: {
      type: Number,
    },
    IntroBrok: {
      type: Number,
    },
    IntroBrok2: {
      type: Number,
    },
    BrokerBrok: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const FranchiseBrokerageReport = mongoose.model(
  "franchiseBrokerageReport",
  franchiseBrokerageReportSchema
);
module.exports = { FranchiseBrokerageReport };
