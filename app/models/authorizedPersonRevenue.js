const mongoose = require("mongoose");
const { InternalServices } = require('../apiServices/index');
const authorizedPersonRevenueSchema = new mongoose.Schema(
    {
        authorizedPersonRevenueId: {
            type: String,
            trim: true
        },
        mutualFundId: {
            type: String,
            trim: true
        },
        IpoId: {
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
        clientCode: {
            type: String,
            trim: true
        },
        amount: {
            type: String,
            trim: true
        },
        type: {
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
authorizedPersonRevenueSchema.pre('save', async function (next) {
    InternalServices.getSequenceId({ type: "authorizedPersonRevenue" });
    var doc = this;
    let counter = await InternalServices.getSequenceId({ type: "authorizedPersonRevenue" });
    doc.mutualIpoId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
    next();

});

const authorizedPersonRevenue = mongoose.model("authorizedPersonRevenue", authorizedPersonRevenueSchema);
module.exports = { authorizedPersonRevenue };
