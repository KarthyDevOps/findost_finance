const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");
const {
  createLeadsService,
  leadListService
} = require("../services/leads.service");

const createLeads = async (req, res) => {
  const params = req.body;
  console.log('params', params)
  params.token = req.user.CRMAccessToken

  params.apId = params.APId || req.user.authorizedPersonId || req.user.apId
  params.apName = params.APName || req.user.name || ''
  const result = await createLeadsService(params);
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


const leadList = async (req, res) => {
  const params = req?.query;
  if (!params?.limit) params.limit = 10
  if (!params?.page) params.page = 1
  params.limit = parseInt(params?.limit);
  params.page = parseInt(params?.page);
  params.apId = req.user.authorizedPersonId
  const result = await leadListService(params);
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
  createLeads,
  leadList
};
