const { Date } = require("mongoose");
const mongoose = require("mongoose");
// const moment = require("moment");

const ipoTransactionListSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
    },
    applicationNumber: {
      type: String,
    },
    clientName: {
      type: String,
    },
    chequeNumber: {
      type: String,
    },
    referenceNumber: {
      type: String,
    },
    dpVerStatusFlag: {
      type: String,
    },
    subBrokerCode: {
      type: String,
    },
    depository: {
      type: String,
    },
    pan: {
      type: String,
    },

    ifsc: {
      type: String,
    },
    timestamp: {
      type: Date,
    },

    bankAccount: {
      type: String,
    },
    bankCode: {
      type: String,
    },
    dpVerReason: {
      type: String,
    },
    dpId: {
      type: String,
    },
    upi: {
      type: String,
    },
    upiAmtBlocked: {
        type: String,
      },
    bids: {
        type: Array,
      },
    allotmentMode: {
        type: String,
      },
    dpVerFailCode: {
        type: String,
      },
    nonASBA: {
        type: Boolean,
      },
    upiFlag: {
        type: String,
      },
    category: {
        type: String,
      },
    locationCode: {
        type: String,
      },
    clientBenId: {
        type: String,
      },
    status: {
        type: String,
      },
    isActive: {
        type: Boolean,
        default: true,
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

const ipoTransactionList = mongoose.model("ipoTransactionList", ipoTransactionListSchema);
module.exports = { ipoTransactionList };
