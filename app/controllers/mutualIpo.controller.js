const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");
const {
    creatMutualIpoService,
    updateMutualIpoService,
    getMutualIpoService,
    deleteMutualIpoService,
    mutualIpoListService
} = require("../services/mutualIpo.service");

const createMutualIpo = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await creatMutualIpoService(params);
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

const getMutualIpo = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    const result = await getMutualIpoService(params);
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

const updateMutualIpo = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await updateMutualIpoService(params);
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

const mutualIpoList = async (req, res) => {
    const params = req?.query;
    if (!params?.limit) params.limit = 10
    if (!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await mutualIpoListService(params);
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

const deleteMutualIpo = async (req, res) => {

    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.cancelReason = req?.body?.cancelReason,
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteMutualIpo(params);
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
    createMutualIpo,
    getMutualIpo,
    updateMutualIpo,
    mutualIpoList,
    deleteMutualIpo
};
