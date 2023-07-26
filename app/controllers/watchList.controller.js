const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    watchListListService,
    createWatchListService,
    getWatchListService,
    updateWatchListService,
  } = require("../services/watchList.service");
  
  const createWatchList = async (req, res) => {
    const params = req.body;
    params.createdBy = req?.user?._id?.toString();
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    params.apId = req?.user?._id?.toString()
    const result = await createWatchListService(params);
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
  
  const getWatchList = async (req, res) => {
    const params = req.body;
    params.id = req.query.id;
    params.watchListId = req?.query?.watchListId;
    
    const result = await getWatchListService(params);
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
  
  const updateWatchList = async (req, res) => {
    const params = req.body;
    params.id = req?.query?.id;
    params.watchListId = req?.query?.watchListId;
    params.updatedBy = req?.user?._id?.toString();
    params.lastUpdatedBy = req?.user?.userType;
    params.userType = req?.user?.userType;
    const result = await updateWatchListService(params);
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
  
  const watchListList = async (req, res) => {
    const params = req?.query;
    if (!params.limit) params.limit = 10;
    if (!params.page) params.page = 1;
    params.apId = req?.user?._id?.toString()
    const result = await watchListListService(params);
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
    createWatchList,
    getWatchList,
    updateWatchList,
    watchListList,
   
    
  };
  