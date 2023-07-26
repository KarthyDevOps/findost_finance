const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    AccordFintechAPIServices,KORPAPIServices
} = require("../externalServices");
const {
  
  pageMetaService,
} = require("../helpers/index");


const GetFundsListService = async (params) => {
  let resp = await AccordFintechAPIServices.GetFundsListAPI(params);
  //console.log(resp)
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp.Table || []
  };
};
const categoryListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryListAPI(params);
    //console.log(resp)
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || []
    };
};
const categoryReturnsListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryReturnsAPI(params);
    const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: { list:  resp?.Table || [], pageMeta },
    };
   
};

const schemesListService = async (params) => {
    let resp = await AccordFintechAPIServices.schemesListAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || []
    };
};


const getSchemeWithInfoService = async (params) => {
  let resp = await AccordFintechAPIServices.getSchemeWithInfoAPI(params);
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRecords || 0);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: { list:  resp?.Table || [], pageMeta },
    };
};


const getFundFactsheetService = async (params) => {
    let resp = await AccordFintechAPIServices.getFundFactsheetAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || []
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
  console.log(resp)
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list:  resp?.Table || [], pageMeta },
  };

};

const getEconomyNewsService = async (params) => {
  let resp = await AccordFintechAPIServices.getEconomyNewsAPI(params);
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list:  resp?.Table || [], pageMeta },
  };
 
};

    

module.exports = {
    GetFundsListService,
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
    getEconomyNewsService,
    getSchemeWithInfoService
};
