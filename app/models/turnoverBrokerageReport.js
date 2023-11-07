const mongoose = require("mongoose");
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
    },
    InraDayTurnover: {
      type: String,
    },
    InraDayBrokerage: {
      type: String,
    },
    DeliveryTurnover: {
      type: String,
    },
    DeliveryBrokerage: {
      type: String,
    },
    TurnOver: {
      type: String,
    },
    Brokerage: {
      type: String,
    },
    FutureTurnover: {
      type: String,
    },
    FutureBrokerage: {
      type: String,
    },
    AccountName: {
      type: String,
    },
    OptionTurnover: {
      type: String,
    },
    OptionBrokerage: {
      type: String,
    },
    TotalTurnOver: {
      type: String,
    },
    TotalBrokerage: {
      type: String,
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
