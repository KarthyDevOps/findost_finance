const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    authenticationService,
    clientDetailsService,
    clientProfileService,
    clientDashboardService,
    clientMasterService,
    clientHoldingService,
    clientListService,
    clientWithMarginShortFallService,
    topPerformingClientService,
    myBrokerageRevenueService,
    myClientsReportService,
    clientPositionsService,
    myRevenueReportService,
    myReportTopClientsService
  } = require("../services/korp.service");
  
  const authentication = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    const result = await authenticationService(params);
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
  
  const clientDetails = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientDetailsService(params);
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
  const clientProfile = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    const result = await clientProfileService(params);
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
  const clientDashboard = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    const result = await clientDashboardService(params);
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
  const clientMaster = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    const result = await clientMasterService(params);
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
  
  const clientHolding = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientHoldingService(params);
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
  const clientList = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientListService(params);
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
  
  const clientWithMarginShortFall = async (req, res) => {
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientWithMarginShortFallService(params);
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
  const topPerformingClient = async (req, res) => {
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await topPerformingClientService(params);
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
  const myBrokerageRevenue = async (req, res) => {
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myBrokerageRevenueService(params);
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
  const myClientsReport = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myClientsReportService(params);
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
  const clientPositions = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientPositionsService(params);
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
  const myRevenueReport = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myRevenueReportService(params);
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
  const myReportTopClients = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myReportTopClientsService(params);
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
    authentication,
    clientDetails,
    clientProfile,
    clientDashboard,
    clientMaster,
    clientHolding,
    clientList,
    clientWithMarginShortFall,
    topPerformingClient,
    myBrokerageRevenue,
    myClientsReport,
    clientPositions,
    myRevenueReport,
    myReportTopClients
  };
  