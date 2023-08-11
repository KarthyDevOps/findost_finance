const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { mutualFundIPO } = require("../models/mutualFundIpo");


const {
    pageMetaService,
} = require("../helpers/index");


const { getMutualIpoList } = require("./list.service");



const creatMutualIpoService = async (params) => {
    var newvalues = params;
    const resp = await mutualFundIPO.create(newvalues);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: {
            _id: resp?._id,
        },
    };
};

const getMutualIpoService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    const resp = await mutualFundIPO.findOne(payload);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp,
    };
};

const updateMutualIpoService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    delete params["id"];
    var newvalues = {
        $set: params,
    };
    const resp = await mutualFundIPO.updateOne(payload, newvalues);
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

const mutualIpoListService = async (params) => {
    params.all = true;
    const allList = await getMutualIpoList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getMutualIpoList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};

const deleteMutualIpoService = async (params) => {
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

    const resp = await mutualFundIPO.updateMany({ _id: ids }, newvalues);
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
    creatMutualIpoService,
    getMutualIpoService,
    updateMutualIpoService,
    mutualIpoListService,
    deleteMutualIpoService
};
