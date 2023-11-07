const mongoose = require("mongoose");
const moment = require("moment");
const turnoverBrokerageReportSchema = new mongoose.Schema(
  {
    APId: {
        type: String,
    },
    AccountID: {
      type: String,
    },
    AccountName: {
      type: String,
    },
    TradeDate: {
      type: Date,
      get(value) {
        return moment(value).format("YYYY-MM-DD");
      }
    },
    InraDayTurnover: {
      type: Number,
    },
    InraDayBrokerage: {
      type: Number,
    },
    DeliveryTurnover: {
      type: Number,
    },
    DeliveryBrokerage: {
      type: Number,
    },
    TurnOver: {
      type: Number,
    },
    Brokerage: {
      type: Number,
    },
    FutureTurnover: {
      type: Number,
    },
    FutureBrokerage: {
      type: Number,
    },
    OptionTurnover: {
      type: Number,
    },
    OptionBrokerage: {
      type: Number,
    },
    TotalTurnOver: {
      type: Number,
    },
    TotalBrokerage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const TurnoverBrokerageReport = mongoose.model(
  "turnoverBrokerageReport",
  turnoverBrokerageReportSchema
);
module.exports = { TurnoverBrokerageReport };
