const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const crmTicketSchema = new mongoose.Schema(
  {
    crmTicketId: {
      type: String
    },
    ticketId: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    priorityScore: {
      type: String,
      required: true,
    },
    customerEmailId: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
        type: String,
      },
    attachmentExtension: {
      type: String,
    },
    attachmentExtension: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    APId: {
      type: String,
      required: true,
    },
    APName: {
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
crmTicketSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "crmTicket" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "crmTicket" });
  doc.crmTicketId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const CrmTicket = mongoose.model("crmTicket", crmTicketSchema);
module.exports = { CrmTicket };
