const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    crmTicketListService,
    createCrmTicketService,
    getCrmTicketService,
    crmTicketUpdateStatusService
  } = require("../services/crmTicket.service");
  
  const createCrmTicket = async (req, res) => {
    const params = req.body;
    const result = await createCrmTicketService(params);
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
  
  const getCrmTicket = async (req, res) => {
    const params = req.body;
    params.crmTicketId = req?.query?.crmTicketId;
    const result = await getCrmTicketService(params);
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
  
  const crmTicketList = async (req, res) => {
    const params = req?.query;
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    const result = await crmTicketListService(params);
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
  const crmTicketUpdateStatus = async (req, res) => {
    
    const result = await crmTicketUpdateStatusService();
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
    createCrmTicket,
    getCrmTicket,
    crmTicketList,
    crmTicketUpdateStatus
  };
  