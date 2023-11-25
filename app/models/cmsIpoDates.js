const mongoose = require("mongoose");
const { getImageURL } = require("../utils/s3Utils");
const moment = require("moment");
const cmsIpoDatesSchema = new mongoose.Schema(
  {
    biddingStartDate: {
      type: String,
      trim: true,
    },
    symbol: {
      type: String,
      trim: true,
    },
    minBidQuantity: {
      type: String,
      trim: true,
    },
    registrar: {
      type: String,
      trim: true,
    },
    lotSize: {
      type: String,
      trim: true,
    },
    t1ModEndDate: {
      type: String,
      trim: true,
    },
    dailyStartTime: {
      type: String,
      trim: true,
    },
    t1ModStartTime: {
      type: String,
      trim: true,
    },
    categoryDetails: {
      type: Array,
      trim: true,
    },
    biddingEndDate: {
      type: String,
      trim: true,
    },
    tickSize: {
      type: String,
      trim: true,
    },
    issueType: {
      type: String,
      trim: true,
    },
    faceValue: {
      type: String,
      trim: true,
    },
    biddingEndDate: {
      type: String,
      trim: true,
    },
    t1ModEndTime: {
      type: String,
      trim: true,
    },
    dailyEndTime: {
      type: String,
      trim: true,
    },
    subCategorySettings: {
      type: Array,
      trim: true,
    },
    minPrice: {
      type: String,
      trim: true,
    },
    t1ModStartDate: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    issueSize: {
      type: String,
      trim: true,
    },
    subType: {
      type: String,
      trim: true,
    },
    maxPrice: {
      type: String,
      trim: true,
    },
    cutOffPrice: {
      type: String,
      trim: true,
    },
    
    ipoisinNumber: {
      type: String,
      trim: true,
      default: null,
    },
    ipoDoc: {
      type: String,
      trim: true,
      default: null,
    },
    allotmnetDate: {
      type: Date,
      trim: true,
      default: null,
      get(value) {
        return value ? moment(value).format("YYYY-MM-DD") : null;
      },
    },
    refundInitiation: {
      type: Date,
      trim: true,
      default: null,
      get(value) {
        return value ? moment(value).format("YYYY-MM-DD") : null;
      },
    },
    listingOnExchange: {
      type: Date,
      trim: true,
      default: null,
      get(value) {
        return value ? moment(value).format("YYYY-MM-DD") : null;
      },
    },
    applicationNo: {
      type: Array,
      default: [],
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
    toObject: { getters: true },
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
cmsIpoDatesSchema.virtual("ipoDocS3").get(function () {
  console.log("aaa==========================", getImageURL(this.ipoDoc));
  return this.ipoDoc ? getImageURL(this.ipoDoc) : null;
});
const cmsIpoDates = mongoose.model("cmsIpoDates", cmsIpoDatesSchema);
module.exports = { cmsIpoDates };
