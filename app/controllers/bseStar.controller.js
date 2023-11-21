const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    bseStarAuthenticationService,
    bseStarSipCreateService,
    bseStarLumpsumCreateService,
  } = require("../services/bseStar.service");
  
  const bseStarAuthentication = async (req, res) => {
    const params = req?.query;
    params.token = req.user.bseStarAccessToken
    const result = await bseStarAuthenticationService(params);
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
  const bseStarSipCreate = async (req, res) => {
    let params = req?.body;
    params.token = req.user.bseStarAccessToken
    params.APId = req.user.BOUserId
    params.APName = req.user.accountName
  
    const result = await bseStarSipCreateService(params);
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
  const bseStarLumpsumCreate = async (req, res) => {
    var params = req?.body;
    params.token = req.user.bseStarAccessToken
    params.APId = req.user.BOUserId
    params.APName = req.user.accountName
  
    const result = await bseStarLumpsumCreateService(params);
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
    bseStarAuthentication,
    bseStarSipCreate,
    bseStarLumpsumCreate
  };
  
