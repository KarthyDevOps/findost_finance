const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const mutualFundSchema = new mongoose.Schema(
    {
        mutualFundId: {
            type: String,
            trim: true
        },
        transactionNo: {
            type: String,
            trim: true
        },
        investmentType: {
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
        clientName: {
            type: String,
            trim: true
        },
        schemeCode: {
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
        SIPAmount: {
            type: String,
            trim: true
        },
        SIPFrequency: {
            type: String,
            trim: true
        },
        dayOfInvestment: {
            type: String,
            trim: true,
            default: "PENDING"
        },
        numberOfInstallments: {
            type: String,
            trim: true
        },
        paymentMode: {
            type: String,
            trim: true
        },
        thirdPartyResp: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: false,
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
mutualFundSchema.pre('save', async function (next) {
    InternalServices.getSequenceId({ type: "mutualIpo" });
    var doc = this;
    let counter = await InternalServices.getSequenceId({ type: "mutualFund" });
    doc.mutualFundId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
    next();

});

const mutualFund = mongoose.model("mutualFund", mutualFundSchema);
module.exports = { mutualFund };
