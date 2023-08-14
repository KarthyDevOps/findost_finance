const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");

const {
   creatAPRevenueService,
   updateAPRevenueService,
   deleteAPRevenueService,
   getAPRevenueService,
   APRevenueListService
} = require("../services/authorizedPersonSchema.service");

const createAPRevenue = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await creatAPRevenueService(params);
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

const getAPRevenue = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    const result = await getAPRevenueService(params);
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

const updateAPRevenue = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await updateAPRevenueService(params);
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

const APRevenueList = async (req, res) => {
    const params = req?.query;
    if (!params?.limit) params.limit = 10
    if (!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await APRevenueListService(params);
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

const deleteAPRevenue = async (req, res) => {

    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.cancelReason = req?.body?.cancelReason,
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteAPRevenueService(params);
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
    createAPRevenue,
    getAPRevenue,
    updateAPRevenue,
    APRevenueList,
    deleteAPRevenue
};
