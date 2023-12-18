const excelJs = require("exceljs");
const moment = require("moment");
const { statusCodes } = require("../response/httpStatusCodes");

const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    authenticationService,
    clientDetailsService,
    clientProfileService,
    clientDashboardService,
    clientMasterService,
    clientHoldingService,
    clientListService,
    clientWithMarginShortFallService,
    topPerformingClientService,
    myBrokerageRevenueService,
    myClientsReportService,
    clientPositionsService,
    myRevenueReportService,
    myReportTopClientsService,
    myReportOverAllService,
    clientListWithLedgerService,
    clientWithdrawalRequestService,
    dashboardApStatusCountService,
    korpClientProfileSuperAdminTokenService,
    validateUPIService
  } = require("../services/korp.service");
  
  const authentication = async (req, res) => {
    const params = req?.body;
    //params.token = req.user.korpAccessToken
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
  
  const clientDetails = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientDetailsService(params);
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
    var params = req?.query;
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
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
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
  const clientList = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId  || process.env.KORP_BRANCHID
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientListService(params);
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
  const clientListWithLedger = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId  || process.env.KORP_BRANCHID
    if(!params.limit) params.limit =10
    if(!params.page) params.page =1
    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientListWithLedgerService(params);
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
  
  
  const clientWithMarginShortFall = async (req, res) => {
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientWithMarginShortFallService(params);
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
  const topPerformingClient = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await topPerformingClientService(params);
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
  const myBrokerageRevenue = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myBrokerageRevenueService(params);
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
  const myClientsReport = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myClientsReportService(params);
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
  const clientPositions = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientPositionsService(params);
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
  const myRevenueReport = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myRevenueReportService(params);
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
  const myReportTopClients = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myReportTopClientsService(params);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result?.statusCode,
        result?.message,
        result?.data
      );
    }
    if(params.export == true || params.export == 'true')
    {
      let workbook = new excelJs.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");
      worksheet.columns = [
          { header: "AccountID", key: "AccountID", width: 15 },
          { header: "AccountName", key: "AccountName", width: 25 },
          { header: "turnOver", key: "turnOver", width: 25 },
          { header: "revenue", key: "revenue", width: 25 },
          { header: "myBrokerageRevenue", key: "myBrokerageRevenue", width: 25 },
      ];

      let workData = result.data.list || [];
      console.log(workData)
     // if (workData?.length) workData = workData?.map(w => ({ ...w, fullName: w?.userDetails?.fullName || "" }))
      worksheet.addRows(workData);
      res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + `My Reports-${moment().format('YYYY-MM-DD-hh-mm-ss')}.xlsx`
      );
      await workbook.xlsx.write(res);
      return res.status(statusCodes.HTTP_OK).end();
    }
    return sendSuccessResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  };
  const myReportOverAll = async (req, res) => {
    const params = req?.query;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await myReportOverAllService(params);

    if ((params.export ==true || params.export == "true" )&& result.status) {
      let workbook = new excelJs.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");
      worksheet.columns = [
          { header: "Date", key: "date", width: 15 },
          { header: "totalTurnOver", key: "totalTurnOver", width: 25 },
          { header: "totalRevenue", key: "totalRevenue", width: 25 },
          { header: "totalMyBrokerageRevenue", key: "totalMyBrokerageRevenue", width: 25 },
      ];

      let workData = result.data || [];
      console.log(workData)
     // if (workData?.length) workData = workData?.map(w => ({ ...w, fullName: w?.userDetails?.fullName || "" }))
      worksheet.addRows(workData);
      res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + `My Reports-${moment().format('YYYY-MM-DD-hh-mm-ss')}.xlsx`
      );
      await workbook.xlsx.write(res);
      return res.status(statusCodes.HTTP_OK).end();
  }

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
  const clientWithdrawalRequest = async (req, res) => {
    const params = req?.body;
    params.token = req.user.korpAccessToken
    params.FIRMID = process.env.KORP_FIRMID
    params.BRANCH = params.apId =req.user.apId || process.env.KORP_BRANCHID

    params.FINANCIALYEAR = process.env.KORP_FINANCIALYEAR
    const result = await clientWithdrawalRequestService(params);
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
  const dashboardApStatusCount = async (req, res) => {
    const params = req?.query;
    const result = await dashboardApStatusCountService(params);
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
  const korpClientProfileSuperAdminToken = async (req, res) => {
    let params = req?.query;
    params.token =req.user.korpAccessToken
    const result = await korpClientProfileSuperAdminTokenService(params);
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

  const validateUPI = async (req, res) => {
    let params = req?.query;
    const result = await validateUPIService(params);
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
    clientDetails,
    clientProfile,
    clientDashboard,
    clientMaster,
    clientHolding,
    clientList,
    clientWithMarginShortFall,
    topPerformingClient,
    myBrokerageRevenue,
    myClientsReport,
    clientPositions,
    myRevenueReport,
    myReportTopClients,
    myReportOverAll,
    clientListWithLedger,
    clientWithdrawalRequest,
    dashboardApStatusCount,
    korpClientProfileSuperAdminToken,
    validateUPI
  };
  