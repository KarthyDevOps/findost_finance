const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { KORPAPIServices } = require("../externalServices");
const {
  TurnoverBrokerageReport,
} = require("../models/turnoverBrokerageReport");
const {
  FranchiseBrokerageReport,
} = require("../models/franchiseBrokerageReport");
const moment = require("moment");
let xmlParser = require("xml2json");
function convertToArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (typeof value === "object") {
    return [value];
  } else {
    return [];
  }
}
const getDailyTurnOverBrokerageReportForAllAPService = async (params) => {
  params.fromDate = moment().format("YYYY-MM-DD");
  params.toDate = moment().format("YYYY-MM-DD");
  let tokenResp = await KORPAPIServices.authenticationAPI(params);
  console.log("tokenResp", tokenResp);
  if (tokenResp?.access_token) {
    let insertDoc = [];
    params.token = tokenResp?.access_token;
    let resp = await KORPAPIServices.topPerformingClientAPI({ ...params });
    let result = [];
    if (resp) {
      resp = xmlParser.toJson(resp);
      resp = JSON.parse(resp);
      result = resp.DataSet["diffgr:diffgram"]["NewDataSet"]["Table"] || [];
      result = convertToArray(result);
    }
    if (result && result.length > 0) {
      result.map((e) => {
        insertDoc.push({
          APId: e.Branch,
          AccountID: e.AccountID,
          AccountName: e.AccountName,
          TradeDate: moment(e.TradeDate).format("YYYY-MM-DD"),
          InraDayTurnover: e.InraDayTurnover,
          DeliveryTurnover: e.DeliveryTurnover,
          DeliveryBrokerage: e.DeliveryBrokerage,
          TurnOver: e.TurnOver,
          Brokerage: e.Brokerage,
          FutureTurnover: e.FutureTurnover,
          FutureBrokerage: e.FutureBrokerage,
          OptionTurnover: e.OptionTurnover,
          OptionBrokerage: e.OptionBrokerage,
          TotalTurnOver: e.TotalTurnOver,
          TotalBrokerage: e.TotalBrokerage,
        });
      });
      console.log("insertDoc", insertDoc);
      await TurnoverBrokerageReport.insertMany(insertDoc);
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: result,
    };
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: messages?.error,
      data: [],
    };
  }
};
const getDailyFranchiseBrokerageReportForAllAPService = async (params) => {
  params.fromDate = moment().format("YYYY-MM-DD");
  params.toDate = moment().format("YYYY-MM-DD");
  let tokenResp = await KORPAPIServices.authenticationAPI(params);
  if (tokenResp?.access_token) {
    let insertDoc = [];
    params.token = tokenResp?.access_token;
    //params.Exchange = "BSE"; // "NSE" , "CUR","ALL"
    params.Segment = "CAP";
    await Promise.all([
      KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "BSE" }),
      KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "NSE" }),
      KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "CUR" }),
      KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "ALL",Segment:"ALL"}),
    ]).then(async ([bseResp,nseResp,curResp,allResp]) => {
        result = [...bseResp, ...nseResp, ...curResp,...allResp];

      console.log('result',result)
      if (result && result.length > 0) {
        console.log(result)
        result.map((e) => {
          insertDoc.push({
            APId: e.BranchID,
            ClientCode: e.ClientCode,
            ClientName: e.ClientName,
            TradeDate: moment(params.fromDate).format("YYYY-MM-DD"),
            Exchange: e.InraDayTurnover,
            Segment: e.SegmentID,
            TotalBrok: e.TotalBrok,
            IntroBrok: e.IntroBrok,
            IntroBrok2: e.IntroBrok2,
            BrokerBrok: e.BrokerBrok,
          });
        });
        console.log("insertDoc", insertDoc);
        await FranchiseBrokerageReport.insertMany(insertDoc);
      }
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: result,
      };
    }).catch((e)=>{
        console.log(e)
    });
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: messages?.error,
      data: [],
    };
  }
};
module.exports = {
  getDailyTurnOverBrokerageReportForAllAPService,
  getDailyFranchiseBrokerageReportForAllAPService,
};
