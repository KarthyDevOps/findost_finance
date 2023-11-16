const mongoose = require("mongoose");

const { getImageURL } = require("../utils/s3Utils")
const moment = require("moment");

const cmsIpoDatesSchema = new mongoose.Schema(
    {
        ipoisinNumber: {
            type: String,
            trim: true
        },
        ipoDoc: {
            type: String,
            trim: true
        },
        allotmnetDate: {
            type: Date,
            trim: true,
            get(value) {
                return moment(value).format("YYYY-MM-DD");
              }
        },
        refundInitiation: {
            type: Date,
            trim: true,
            get(value) {
                return moment(value).format("YYYY-MM-DD");
              }
        },
        listingOnExchange: {
            type: Date,
            trim: true,
            get(value) {
                return moment(value).format("YYYY-MM-DD");
              }
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
cmsIpoDatesSchema.virtual('ipoDocS3').get(function () {

 
    return  this.ipoDoc ? getImageURL(this.ipoDoc) : null;
  })

const cmsIpoDates = mongoose.model("cmsIpoDates", cmsIpoDatesSchema);
module.exports = { cmsIpoDates };
