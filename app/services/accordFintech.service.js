const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    AccordFintechAPIServices,KORPAPIServices
} = require("../externalServices");
const categoryListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryListAPI(params);
    //console.log(resp)
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const categoryReturnsListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryReturnsAPI(params);
      //  console.log(resp)
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const schemesListService = async (params) => {
    let resp = await AccordFintechAPIServices.schemesListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getFundFactsheetService = async (params) => {
    let resp = await AccordFintechAPIServices.getFundFactsheetAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const getSchemesFilteredListService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemesFilteredListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getSchemeNAVDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemeNAVDetailsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getMFSnapshotDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getMFSnapshotDetailsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getSystematicInvestmentpatternService = async (params) => {
    let resp = await AccordFintechAPIServices.getSystematicInvestmentpatternAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const allHoldingsService = async (params) => {
    let resp = await AccordFintechAPIServices.allHoldingsAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const ipoIssueService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoIssueAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const ipoNewListingService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoNewListingAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const ipoSnapshotService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoSnapshotAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const nfoUpdatesService = async (params) => {
    let resp = await AccordFintechAPIServices.NFOUpdatesAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};


const getCorporateNewsService = async (params) => {
  let resp = await AccordFintechAPIServices.getCorporateNewsAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp || null
  };
};

const getEconomyNewsService = async (params) => {
  let resp = await AccordFintechAPIServices.getEconomyNewsAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp || null
  };
};

    

module.exports = {
    categoryListService,
    categoryReturnsListService,
    schemesListService,
    getFundFactsheetService,
    getSchemesFilteredListService,
    getSchemeNAVDetailsService,
    getMFSnapshotDetailsService,
    getSystematicInvestmentpatternService,
    allHoldingsService,
    ipoIssueService,
    ipoNewListingService,
    ipoSnapshotService,
    nfoUpdatesService,
    getCorporateNewsService,
    getEconomyNewsService
};
