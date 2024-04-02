const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    getDailyTurnOverBrokerageReportForAllAPService,
    getDailyFranchiseBrokerageReportForAllAPService,
    getDailyIPOService,
    getDailyTransactionListService
  } = require("../services/cron.service");
  
  const getDailyTurnOverBrokerageReportForAllAP = async (req, res) => {
    let params = req?.query;
    const result = await getDailyTurnOverBrokerageReportForAllAPService(params);
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
  const getDailyFranchiseBrokerageReportForAllAP = async (req, res) => {
    let params = req?.query;
    const result = await getDailyFranchiseBrokerageReportForAllAPService(params);
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
  
  const getDailyIPO = async (req, res) => {
    let params = req?.query;
    const result = await getDailyIPOService(params);
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
  
  const getDailyTransactionList = async (req, res) => {
    let params = req?.query;
    const result = await getDailyTransactionListService(params);
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
    getDailyTurnOverBrokerageReportForAllAP,
    getDailyFranchiseBrokerageReportForAllAP,
    getDailyIPO,
    getDailyTransactionList
  };
  