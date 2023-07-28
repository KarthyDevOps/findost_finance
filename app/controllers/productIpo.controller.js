const {
    sendErrorResponse,
    sendSuccessResponse,
} = require("../response/response");
const {
    createProductIpoService,
    getProductIpoService,
    updateProductIpoService,
    productIpoListService,
    deleteProductIpoService,
    productIpoCountListService
} = require("../services/productIpo.service");

const createProductIpo = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await createProductIpoService(params);
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

const getProductIpo = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    const result = await getProductIpoService(params);
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

const updateProductIpo = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.APId = req?.user?._id,
    params.APName =  req?.user?.name
    const result = await updateProductIpoService(params);
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

const productIpoList = async (req, res) => {
    const params = req?.query;
    if (!params?.limit) params.limit = 10
    if (!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await productIpoListService(params);
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

const deleteProductIpo = async (req, res) => {

    const params = req.body;
    if (req.query.id) {
        params.id = req?.query?.id;
    }
    params.ids = req.body.ids;
    params.cancelReason = req?.body?.cancelReason,
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await deleteProductIpoService(params);
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

const productIpoCountList = async (req, res) => {
    const params = req?.query;
    if (!params?.limit) params.limit = 10
    if (!params?.page) params.page = 1
    params.limit = parseInt(params?.limit);
    params.page = parseInt(params?.page);
    console.log("req", params);
    const result = await productIpoCountListService(params);
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
    createProductIpo,
    getProductIpo,
    updateProductIpo,
    productIpoList,
    deleteProductIpo,
    productIpoCountList
};
