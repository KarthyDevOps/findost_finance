const mongoose = require("mongoose");
const leadsSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
    },
    productId: {
      type: String,
    },
    productName: {
      type: String,
    },
    apId: {
      type: String,
      required: true,
    },
    isExistUser: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    emailId: {
      type: String,
    },
    aditionalInfo: {
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
const Leads = mongoose.model("leads", leadsSchema);
module.exports = { Leads };
