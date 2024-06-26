const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { ProductIPO } = require("../models/productIpo");
const {authorizedPersonRevenue} = require('../models/authorizedPersonRevenue')


const {
    pageMetaService,
} = require("../helpers/index");


const { getProductIpoList, getProductCountIpoList } = require("./list.service");



const createProductIpoService = async (params) => {
    var newvalues = params;
    const resp = await ProductIPO.create(newvalues);
    let storeData = {
        IpoId: resp?.productIpoId,
        APId: resp?.APId,
        APName: resp?.APName,
        clientCode: resp?.clientCode,
        amount: resp?.amount,
        type:"productIpo"
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

const getProductIpoService = async (params) => {
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    const resp = await ProductIPO.findOne(payload);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp,
    };
};

const updateProductIpoService = async (params) => {

    if (params?.cancelReason) {
        var payload = {
            _id: params?.id,
            isDeleted: false
        };
        var newvalues = {
            $set: {
                cancelReason: params?.cancelReason,
                currentStatus: params?.currentStatus,
                isDeleted: false
            },
        };
        const resp = await ProductIPO.updateOne(payload, newvalues);
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
    }
    var payload = {
        _id: params?.id,
        isDeleted: false,
    };
    delete params["id"];
    var newvalues = {
        $set: params,
    };
    const resp = await ProductIPO.updateOne(payload, newvalues);
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

const productIpoListService = async (params) => {
    params.all = true;
    const allList = await getProductIpoList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getProductIpoList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};

const deleteProductIpoService = async (params) => {
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

    const resp = await ProductIPO.updateMany({ _id: ids }, newvalues);
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

const productIpoCountListService = async () => {

    const result = await getProductCountIpoList();
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: result,
    };
};



module.exports = {
    createProductIpoService,
    getProductIpoService,
    updateProductIpoService,
    productIpoListService,
    deleteProductIpoService,
    productIpoCountListService
};
