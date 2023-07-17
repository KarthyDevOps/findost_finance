const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    authenticationService,
    clientProfileService,
    clientDashboardService,
    clientMasterService,
    clientHoldingService
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
    const params = req?.body;
    params.token = req.user.korpAccessToken
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

  module.exports = {
    authentication,
    clientProfile,
    clientDashboard,
    clientMaster,
    clientHolding
  };
  