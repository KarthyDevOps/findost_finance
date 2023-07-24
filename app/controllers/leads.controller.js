const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    createLeadsService
  } = require("../services/leads.service");
  
  const createLeads = async (req, res) => {
    const params = req.body;
    params.apId = req.user.authorizedPersonId
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
  
  module.exports = {
    createLeads
  };
  