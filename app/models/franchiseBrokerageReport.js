const mongoose = require("mongoose");
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
    },
    Exchange: {
      type: String,
    },
    Segment: {
      type: String,
    },
    TotalBrok: {
      type: String,
    },
    IntroBrok: {
      type: String,
    },
    IntroBrok2: {
      type: String,
    },
    BrokerBrok: {
      type: String,
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
