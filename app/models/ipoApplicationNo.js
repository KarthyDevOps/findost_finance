const mongoose = require("mongoose");
const ipoApplicationNoSchema = new mongoose.Schema(
  {
    ipoisinNumber: {
      type: String,
    },
    applicationNo: {
      type: String,
    },
    clientCode: {
      type: String,
      required: true,
    },
    apId: {
      type: String,
      required: true,
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
const ipoApplicationNo = mongoose.model(
  "ipoApplicationNo",
  ipoApplicationNoSchema
);
module.exports = { ipoApplicationNo };
