const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { mutualFund } = require("../models/mutualFund");
const {authorizedPersonRevenue} = require('../models/authorizedPersonRevenue')


const {
    pageMetaService,
} = require("../helpers/index");


const { getMutualFundList } = require("./list.service");



const creatMutualFundService = async (params) => {
    var newvalues = params;
    console.log('newvalues--->', newvalues)
    const resp = await mutualFund.create(newvalues);
    let storeData = {
        mutualFundId: resp?.mutualFundId,
        APId: resp?.APId,
        APName: resp?.APName,
        clientCode: resp?.clientCode,
        amount: resp?.SIPAmount,
        type:"mutualFund"
    }
    let createAPRevenue = await authorizedPersonRevenue.create(storeData)
    console.log('createAPRevenue--->', createAPRevenue)

    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: {
            _id: resp?._id,
        },
    };
};

const getMutualFundService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    const resp = await mutualFund.findOne(payload);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp,
    };
};

const updateMutualFundService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    delete params["id"];
    var newvalues = {
        $set: params,
    };
    const resp = await mutualFund.updateOne(payload, newvalues);
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

const mutualFundListService = async (params) => {
    params.all = true;
    const allList = await getMutualFundList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getMutualFundList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};

const deleteMutualFundService = async (params) => {
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

    const resp = await mutualFund.updateMany({ _id: ids }, newvalues);
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
    creatMutualFundService,
    getMutualFundService,
    updateMutualFundService,
    mutualFundListService,
    deleteMutualFundService
};
