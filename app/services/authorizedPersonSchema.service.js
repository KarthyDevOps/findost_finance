const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { authorizedPersonRevenue } = require("../models/authorizedPersonRevenue");


const {
    pageMetaService,
} = require("../helpers/index");


const { getAuthorizedPersonSchemaList } = require("./list.service");



const creatAPRevenueService = async (params) => {
    var newvalues = params;
    const resp = await authorizedPersonRevenue.create(newvalues);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: {
            _id: resp?._id,
        },
    };
};

const getAPRevenueService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    const resp = await authorizedPersonRevenue.findOne(payload);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp,
    };
};

const updateAPRevenueService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    delete params["id"];
    var newvalues = {
        $set: params,
    };
    const resp = await authorizedPersonRevenue.updateOne(payload, newvalues);
    if (!resp.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
            message: messages?.somethingWrong,
            data: [],
        };
    }
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.updated,
        data: [],
    };
};

const APRevenueListService = async (params) => {
    params.all = true;
    const allList = await getAuthorizedPersonSchemaList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getAuthorizedPersonSchemaList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};

const deleteAPRevenueService = async (params) => {
    let ids = [];
    if (params.id) ids.push(params?.id);
    else if (params.ids) {
        ids = params.ids;
    }
    var newvalues = {
        $set: {
            isDeleted: true,
            updatedBy: params?.updatedBy,
            lastUpdatedBy: params?.lastUpdatedBy,
        },
    };

    const resp = await authorizedPersonRevenue.updateMany({ _id: ids }, newvalues);
    if (!resp.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
            message: messages?.somethingWrong,
            data: [],
        };
    }
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.deleted,
        data: [],
    };
};




module.exports = {
    creatAPRevenueService,
    getAPRevenueService,
    updateAPRevenueService,
    APRevenueListService,
    deleteAPRevenueService
};
