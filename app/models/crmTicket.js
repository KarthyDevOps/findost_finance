const mongoose = require("mongoose");
const crmTicketSchema = new mongoose.Schema(
  {
    crmTicketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => {
        const now = Date.now().toString();
        return now.slice(0, 3) + now.slice(10, 13);
      },
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
    UserId: {
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
const CrmTicket = mongoose.model("crmTicket", crmTicketSchema);
module.exports = { CrmTicket };
