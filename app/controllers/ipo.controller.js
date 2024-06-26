const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
  cmsIpoUpdateService,
  buyIPOService
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
  params.token = req.user.IPOAccessToken

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

const ipoCreateOrUpdate = async (req, res) => {
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


const cmsIpoUpdate = async (req, res) => {
  const params = req?.body;
  const result = await cmsIpoUpdateService(params);
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



const buyIPO = async (req, res) => {
  let params = req?.body;
  params.token = req.user.IPOAccessToken
  params.APId = req.user.BOUserId
  params.APName = req.user.accountName
  const result = await buyIPOService(params);
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
  cmsIpoUpdate,
  buyIPO
};
