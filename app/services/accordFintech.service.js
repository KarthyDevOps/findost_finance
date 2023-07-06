const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    AccordFintechAPIServices,KORPAPIServices
} = require("../externalServices");
const categoryListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const categoryReturnsListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryReturnsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};

const schemesListService = async (params) => {
    let resp = await AccordFintechAPIServices.schemesListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const getSchemesFilteredListService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemesFilteredListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const getSchemeNAVDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemeNAVDetailsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const getMFSnapshotDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getMFSnapshotDetailsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const getSystematicInvestmentpatternService = async (params) => {
    let resp = await AccordFintechAPIServices.getSystematicInvestmentpatternAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};
const allHoldingsService = async (params) => {
    let resp = await AccordFintechAPIServices.allHoldingsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};

const ipoIssueService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoIssueAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};

const ipoNewListingService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoNewListingAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};

const ipoSnapshotService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoSnapshotAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};

const nfoUpdatesService = async (params) => {
    let resp = await AccordFintechAPIServices.NFOUpdatesAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.data || null
    };
};


module.exports = {
    categoryListService,
    categoryReturnsListService,
    schemesListService,
    getSchemesFilteredListService,
    getSchemeNAVDetailsService,
    getMFSnapshotDetailsService,
    getSystematicInvestmentpatternService,
    allHoldingsService,
    ipoIssueService,
    ipoNewListingService,
    ipoSnapshotService,
    nfoUpdatesService
};
