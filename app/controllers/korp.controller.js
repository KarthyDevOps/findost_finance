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
    clientListService
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
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = process.env.KORP_BRANCHID

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
  

  module.exports = {
    authentication,
    clientDetails,
    clientProfile,
    clientDashboard,
    clientMaster,
    clientHolding,
    clientList
  };
  