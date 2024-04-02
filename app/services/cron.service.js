const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { KORPAPIServices } = require("../externalServices");
const { IPOAPIServices } = require("../externalServices");
const {ipoTransactionList} = require("../models/ipoTranscationsList")

const {
  TurnoverBrokerageReport,
} = require("../models/turnoverBrokerageReport");
const {
  FranchiseBrokerageReport,
} = require("../models/franchiseBrokerageReport");
const {
  cmsIpoDates,
} = require("../models/cmsIpoDates");

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
const getDailyIPOService = async (params) => {
  let tokenResp = await IPOAPIServices.ipoLoginAPI(params);
  if (tokenResp && tokenResp.status =="success") {
    params.token = tokenResp.token
    let resp = await IPOAPIServices.ipoMasterAPI(params.token, params);
    console.log('resp',resp)
    let insertRecord = [];
    let oldIPOIds ={}
    if (resp && resp.data && resp.data.length > 0) {
      let cmsIpoDatesList = await cmsIpoDates.find({ isDeleted: false });
      cmsIpoDatesList =JSON.parse(JSON.stringify(cmsIpoDatesList))
      cmsIpoDatesList.map((data) => {
        oldIPOIds[data.ipoisinNumber] = {
          ...data,
        };
      });
      result = resp.data.map((data) => {
        if (oldIPOIds[data.isin]) {
          
        } else {
          data.ipoisinNumber = data.isin
          if(data.issueType == "EQUITY")
          {
            insertRecord.push(data) 
          }
         
        }
      })
    }
    if(insertRecord.length >0)
    {
      await cmsIpoDates.insertMany(insertRecord);
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

const getDailyTransactionListService = async (params) => {
  let tokenResp = await IPOAPIServices.ipoLoginAPI(params);
  if (tokenResp && tokenResp.status == "success") {
    params.token = tokenResp.token;
    let result = await IPOAPIServices.ipoTransactionListAPI(params.token);
    if (result && result.status == "success" && result.transactions) {
      const applicationNumbers = result.transactions.map(
        (transaction) => transaction.applicationNumber
      );

      const existingTransactions = await ipoTransactionList.find({
        applicationNumber: { $in: applicationNumbers },
      });

      const newTransactions = result.transactions.filter(
        (transaction) =>
          !existingTransactions.some(
            (existingTransaction) =>
              existingTransaction.applicationNumber ===
              transaction.applicationNumber
          )
      );

      if (newTransactions.length > 0) {
        newTransactions.forEach((transaction) => {
          const [date, time] = transaction.timestamp.split(" ");
          const [day, month, year] = date.split("-");
          const [hour, minute, second] = time.split(":");
          transaction.timestamp = new Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second
          );
        });
        let data = await ipoTransactionList.insertMany(newTransactions);
        console.log(data);
      }

      return {
        status: true,
        statusCode: statusCodes.HTTP_OK,
        message: messages.success,
        data: [],
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes.HTTP_NOT_FOUND,
        message: messages.error,
        data: [],
      };
    }
  } else {
    return {
      status: false,
      statusCode: statusCodes.HTTP_NOT_FOUND,
      message: messages.error,
      data: [],
    };
  }
};

module.exports = {
  getDailyTurnOverBrokerageReportForAllAPService,
  getDailyFranchiseBrokerageReportForAllAPService,
  getDailyIPOService,getDailyTransactionListService
};
