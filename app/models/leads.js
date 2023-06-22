const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
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
leadsSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "leads" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "leads" });
  doc.leadId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const Leads = mongoose.model("leads", leadsSchema);
module.exports = { Leads };
