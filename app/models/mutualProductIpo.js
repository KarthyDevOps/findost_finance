const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const mutualIpoSchema = new mongoose.Schema(
    {
        mutualIpoId: {
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
mutualIpoSchema.pre('save', async function (next) {
    InternalServices.getSequenceId({ type: "mutualIpo" });
    var doc = this;
    let counter = await InternalServices.getSequenceId({ type: "mutualIpo" });
    doc.mutualIpoId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
    next();

});

const mutualIPO = mongoose.model("mutualIpo", mutualIpoSchema);
module.exports = { mutualIPO };
