const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
} = require("../services/ipo.service");

const ipoLogin = async (req, res) => {
  const params = req?.query;
  const result = await ipoLoginService(params);
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

const ipoTransactionAdd = async (req, res) => {
  const params = req?.query;
  const result = await ipoTransactionAddService(params);
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

const ipoTransactionList = async (req, res) => {
  const params = req?.query;
  const result = await ipoTransactionListService(params);
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

const ipoMaster = async (req, res) => {
  const params = req?.query;
  params.token = req.user.IPOAccessToken
  const result = await ipoMasterService(params);
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
  ipoLogin,
  ipoTransactionAdd,
  ipoTransactionList,
  ipoMaster,
};
