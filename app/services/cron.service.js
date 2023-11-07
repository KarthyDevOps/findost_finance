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

    var now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2023, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));

        params.fromDate = moment(new Date(d)).format("YYYY-MM-DD");
        params.toDate = moment(new Date(d)).format("YYYY-MM-DD");

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
        console.log('length - >'+result.length)
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
    }

   
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: [],
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
    var now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2023, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
        daysOfYear.push(new Date(d));
        params.fromDate = moment(new Date(d)).format("YYYY-MM-DD");
        params.toDate = moment(new Date(d)).format("YYYY-MM-DD");
        let bseResp =await KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "BSE" });
        let nseResp =await  KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "NSE" });
        let curResp =await  KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "CUR" });
        let allResp =await  KORPAPIServices.myRevenueReportAPI({ ...params, Exchange: "ALL",Segment:"ALL" });
        

          result = [...bseResp, ...nseResp, ...curResp,...allResp];
  
        console.log('result',result.length)
        if (result && result.length > 0) {
          console.log(result)
          bseResp.map((e) => {
            if(e.BranchID =="17HS")
            {
              insertDoc.push({
                APId: e.BranchID,
                ClientCode: e.ClientCode,
                ClientName: e.ClientName,
                TradeDate: moment(params.fromDate).format("YYYY-MM-DD"),
                Exchange: "BSE",
                Segment: e.SegmentID,
                TotalBrok: e.TotalBrok,
                IntroBrok: e.IntroBrok,
                IntroBrok2: e.IntroBrok2,
                BrokerBrok: e.BrokerBrok,
              });
            }
            
          });
          nseResp.map((e) => {
            if(e.BranchID =="17HS")
            {
              insertDoc.push({
                APId: e.BranchID,
                ClientCode: e.ClientCode,
                ClientName: e.ClientName,
                TradeDate: moment(params.fromDate).format("YYYY-MM-DD"),
                Exchange: "NSE",
                Segment: e.SegmentID,
                TotalBrok: e.TotalBrok,
                IntroBrok: e.IntroBrok,
                IntroBrok2: e.IntroBrok2,
                BrokerBrok: e.BrokerBrok,
              });
            }
            
          });
          curResp.map((e) => {
            if(e.BranchID =="17HS")
            {
              insertDoc.push({
                APId: e.BranchID,
                ClientCode: e.ClientCode,
                ClientName: e.ClientName,
                TradeDate: moment(params.fromDate).format("YYYY-MM-DD"),
                Exchange: "CUR",
                Segment: e.SegmentID,
                TotalBrok: e.TotalBrok,
                IntroBrok: e.IntroBrok,
                IntroBrok2: e.IntroBrok2,
                BrokerBrok: e.BrokerBrok,
              });
            }
           
          });
          allResp.map((e) => {
            if(e.BranchID =="17HS")
            {
              insertDoc.push({
                APId: e.BranchID,
                ClientCode: e.ClientCode,
                ClientName: e.ClientName,
                TradeDate: moment(params.fromDate).format("YYYY-MM-DD"),
                Exchange: "ALL",
                Segment: e.SegmentID,
                TotalBrok: e.TotalBrok,
                IntroBrok: e.IntroBrok,
                IntroBrok2: e.IntroBrok2,
                BrokerBrok: e.BrokerBrok,
              });
            }
            
          });
          console.log("insertDoc", insertDoc);
          await FranchiseBrokerageReport.insertMany(insertDoc);
        }
    }

    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: [],
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
module.exports = {
  getDailyTurnOverBrokerageReportForAllAPService,
  getDailyFranchiseBrokerageReportForAllAPService,
};
