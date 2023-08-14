const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");
const {
    creatMutualFundService,
    updateMutualFundService,
    getMutualFundService,
    deleteMutualFundService,
    mutualFundListService
} = require("../services/mutualFundIpo.service");

const createMutualFund = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await creatMutualFundService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const getMutualFund = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    const result = await getMutualFundService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const updateMutualFund = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await updateMutualFundService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const mutualFundList = async (req, res) => {
    const params = req?.query;
    if (!params?.limit) params.limit = 10
    if (!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await mutualFundListService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

const deleteMutualFund = async (req, res) => {

    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.cancelReason = req?.body?.cancelReason,
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteMutualFundService(params);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result?.statusCode,
            result?.message,
            result?.data
        );
    }
    return sendSuccessResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
    );
};

module.exports = {
    createMutualFund,
    getMutualFund,
    updateMutualFund,
    mutualFundList,
    deleteMutualFund
};
