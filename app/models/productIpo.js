const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const productIpoSchema = new mongoose.Schema(
    {
        productIpoId: {
            type: String,
            trim: true
        },
        ipoName: {
            type: String,
            trim: true
        },
        clientName: {
            type: String,
            trim: true
        },
        clientCode: {
            type: String,
            trim: true
        },
        clientNumber: {
            type: String,
            trim: true
        },
        appNo: {
            type: String,
            trim: true
        },
        upiID: {
            type: String,
            trim: true
        },
        upiApprovalStatus: {
            type: String,
            trim: true,
            default: "PENDING"
        },
        bidDetails: {
            type: Array,
            trim: true
        },
        ipoTimeLine: {
            type: Array,
            trim: true
        },
        numberOfLots: {
            type: String,
            trim: true
        },
        lotsApplied: {
            type: String,
            trim: true
        },
        amount: {
            type: String,
            trim: true
        },  
        APId: {
            type: String,
            trim: true
        },
        APName: {
            type: String,
            trim: true
        },
        cancelReason: {
            type: String,
            trim: true

        },
        currentStatus: {
            type: String,
            trim: true,
            enum: ["ACCEPTED", "PENDING", "REJECTED",  "IPOALLOCATED" ,"IPONONALLOCATED"],
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
productIpoSchema.pre('save', async function (next) {
    InternalServices.getSequenceId({ type: "productIPO" });
    var doc = this;
    let counter = await InternalServices.getSequenceId({ type: "productIPO" });
    doc.productIpoId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
    next();

});

const ProductIPO = mongoose.model("productIPO", productIpoSchema);
module.exports = { ProductIPO };
