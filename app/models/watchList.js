const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const watchListSchema = new mongoose.Schema(
  {
    watchListId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    apId: {
        type: String,
    },
    type: {
      type: String,
    },
    extra: {
      type: Object,
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
watchListSchema.pre('save', async function (next) {
  InternalServices.getSequenceId({ type: "watchList" });
  var doc = this;
  let counter = await InternalServices.getSequenceId({ type: "watchList" });
  doc.watchListId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
  next();

});

const WatchList = mongoose.model("watchList", watchListSchema);
module.exports = { WatchList };
