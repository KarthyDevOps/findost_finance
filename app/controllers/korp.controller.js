const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    authenticationService,
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
  module.exports = {
    authentication,
    
  };
  