const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    GetFundsListService,
    categoryListService,
    categoryReturnsListService,
    schemesListService,
    getSchemeWithInfoService,
    GetMFNAVGraphService,
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
  } = require("../services/accordFintech.service");
  
  
  const GetFundsList = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await GetFundsListService(params);
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
  const categoryList = async (req, res) => {
    const params = req?.query;
    
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await categoryListService(params);
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
  const categoryReturnsList = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await categoryReturnsListService(params);
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
  
  const schemesList = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await schemesListService(params);
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
  
  
  const getSchemeWithInfo = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    const result = await getSchemeWithInfoService(params);
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
  
  const GetMFNAVGraph = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
   
    const result = await GetMFNAVGraphService(params);
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
  
  const getFundFactsheet = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getFundFactsheetService(params);
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
  const getSchemesFilteredList = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getSchemesFilteredListService(params);
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
  const getSchemeNAVDetails = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getSchemeNAVDetailsService(params);
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
  const getMFSnapshotDetails = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getMFSnapshotDetailsService(params);
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
  const getSystematicInvestmentpattern = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getSystematicInvestmentpatternService(params);
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
  
  const allHoldings = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await allHoldingsService(params);
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


  const ipoIssue = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await ipoIssueService(params);
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


  const ipoNewListing = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await ipoNewListingService(params);
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

  const ipoSnapshot = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await ipoSnapshotService(params);
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
  const nfoUpdates = async (req, res) => {
    const params = req?.query;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await nfoUpdatesService(params);
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
  

  const getCorporateNews = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getCorporateNewsService(params);
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

  const getEconomyNews = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    params.token = process.env.ACCORD_FINTECH_LOGIN_TOKEN
    const result = await getEconomyNewsService(params);
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
    GetFundsList,
    categoryList,
    categoryReturnsList,
    schemesList,
    getSchemeWithInfo,
    GetMFNAVGraph,
    getFundFactsheet,
    getSchemesFilteredList,
    getSchemeNAVDetails,
    getMFSnapshotDetails,
    getSystematicInvestmentpattern,
    allHoldings,
    ipoIssue,
    ipoNewListing,
    ipoSnapshot,
    nfoUpdates,
    getCorporateNews,
    getEconomyNews
  };
  