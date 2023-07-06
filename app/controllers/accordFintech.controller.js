const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
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
  } = require("../services/accordFintech.service");
  
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
  
  module.exports = {
    categoryList,
    categoryReturnsList,
    schemesList,
    getSchemesFilteredList,
    getSchemeNAVDetails,
    getMFSnapshotDetails,
    getSystematicInvestmentpattern,
    allHoldings,
    ipoIssue,
    ipoNewListing,
    ipoSnapshot,
    nfoUpdates
  };
  