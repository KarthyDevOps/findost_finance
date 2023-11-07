let { Rest } = require("./../restCalls");
let { KorpAPI } = require("../configs");
const qs = require("qs");
const moment = require("moment");
const { createLogger, transports } = require("winston");
const errorLogFile = "error.log";
const logger = createLogger({
  transports: [new transports.File({ filename: errorLogFile, level: "error" })],
});
const authenticationAPI = async (data = {}) => {
  console.log(data, "data");
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.authenticationAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/token";
  let payload = qs.stringify({
    Username: data.userName || process.env.KORP_USER_NAME,
    Password: data.password || process.env.KORP_PASSWORD,
    Grant_type: "password",
  });
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const clientProfileAPI = async (data) => {
  console.log("data------------", data);
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientProfileAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/ClientProfile/Get";
  const queryString = `?ClientCode=${data.clientCode || ""}`;
  apiConfig.url = apiConfig.url + queryString;
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) apiConfig.headers.FIRMID = data.FIRMID;
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientDashboardAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientDashboardAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Common/ClientDashBoard/Get";
  const queryString = `?ClientCode=${data.clientCode || ""}`;
  apiConfig.url = apiConfig.url + queryString;
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) apiConfig.headers.FIRMID = data.FIRMID;
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientMasterAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientMasterAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Masters/ClientMasterDetail/Get";
  const queryString = `?Code=${data.clientCode || ""}&ClientType=${
    data.ClientType || "A"
  }`;
  apiConfig.url = apiConfig.url + queryString;
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) apiConfig.headers.FIRMID = data.FIRMID;
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientHoldingAPI = async (data) => {
  console.log("data", data);
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientHoldingAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/ClientHolding/Post";
  apiConfig.data = {};
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
    apiConfig.data.FirmID = data.FIRMID;
  }
  apiConfig.data.AccountID = data.clientCode;
  apiConfig.data.AsOnDate = moment().format("YYYY-MM-DD");

  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  delete data.token;
  apiConfig.data = apiConfig.data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientListAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientListAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Masters/ClientDirectory/Post";
  apiConfig.data = {};
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
    apiConfig.data["FirmID"] = data.FIRMID;
  }
  if (data.BRANCH) {
    apiConfig.data.AccountID = data.BRANCH;
  }

  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;

  delete data.token;
  apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientWithMarginShortFallAPI = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(KorpAPI.clientWithMarginShortFallAPI)
  );
  apiConfig.url =
    process.env.KORP_BASE_URL + "/Reports/WEBDebtorCreditorList/Post";
  apiConfig.data = {
    CrDrFlag: "NONZERO",
    IncludeMargin: "Y",
    AsOnDate: moment().format("YYYY-MM-DD"),
  };
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
    apiConfig.data["FirmID"] = data.FIRMID;
  }
  if (data.BRANCH) {
    apiConfig.data.Branch = data.BRANCH;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;

  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const topPerformingClientAPI = async (data) => {
  try {
    let apiConfig = JSON.parse(JSON.stringify(KorpAPI.topPerformingClientAPI));
    apiConfig.url =
      process.env.KORP_BASE_URL + "/Reports/TurnoverBrokerageWebReport/Post";
    apiConfig.data = {
      FromDate:
        (data.fromDate && moment(data.fromDate).format("YYYY-MM-DD")) ||
        `${moment().format("YYYY")}-04-01`,
      ToDate:
        (data.toDate && moment(data.toDate).format("YYYY-MM-DD")) ||
        moment().format("YYYY-MM-DD"),
     // Branch: data.BRANCH,
  
      ReportType: "DETAIL",
      // ReportType Values - SUMMARY, DETAIL,
      ReportSelection: "CLIENT",
      //ReportSelection values - BRANCH, SUB_BRANCH, TL, RM, CLIENT, BR_SUB_BR, BR_SUB_BR_TL, BR_SUB_BR_TL_RM
     // AccountID: data.BRANCH,
    };
  
    apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
    if (data.FIRMID) {
      apiConfig.headers.FIRMID = data.FIRMID;
      apiConfig.data["FirmID"] = data.FIRMID;
    }
    if (data.BRANCH) {
      apiConfig.data.Branch = data.BRANCH;
    }
    if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  
    delete data.token;
    // apiConfig.data = data;
    console.log("apiConfig====", apiConfig);
    return await Rest.callApi(apiConfig);
  }
  catch(e){

    logger.error(
      `bugs $$$$$$ : ${path}  - ${data.fromDate}`
    );

   
  }
 
};

const myBrokerageRevenueAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.myBrokerageRevenueAPI));
  apiConfig.url =
    process.env.KORP_BASE_URL + "/Reports/BrokerageSummaryReport/Post";
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  apiConfig.data = {
    FromDate:
      (data.fromDate && moment(data.fromDate).format("YYYY-MM-DD")) ||
      `${moment().format("YYYY")}-04-01`,
    ToDate:
      (data.toDate && moment(data.toDate).format("YYYY-MM-DD")) ||
      moment().format("YYYY-MM-DD"),

    // FromDate: `${moment().format("YYYY")}-04-01`,
    // ToDate: moment().format("YYYY-MM-DD"),
    Exchange: "BSE",
    Segment: "CAP",
    //"IntroCode": data.BRANCH,
    ReportType: "DATE_CLIENT",
  };

  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const clientPositionsAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientPositionsAPI));
  apiConfig.url =
    process.env.KORP_BASE_URL + "/Reports/DerivativeNetPosition/Post";
  apiConfig.headers.Authorization = `Bearer ${
    data.token ||
    "4_YwyL66GO42u1EPQFgbhkru-NzCDY7Y8jVBPjiAwIUyd55zLpfUGxx4rqvDggpF8ijjH6iXP5Q9yY5PM-ajCmRoo_Wt_IR86sFdTytxN1ey0vRgV8S8oFo20rnhokUNskuU4GsSNur7rrnTZvhcrwdOL_zzGOMMMPILNzJuiNftQO8O4MmzO73KL41D_dkF040VzJQxhtU2eURohAMy4WBRVltgQzHeZlMJD9hVshpqs0Eve94GEp3zMD89s-YRUkEDDpNCAPBa7OjouhwvMXwK7VBGW7g9ATAisqp9XC6hXjtteLQlaImoNV_fT4MR3qIaLqU8kubkzziq-hFKz88JBhhIR7SgGTqHXv5DVSk"
  }`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  apiConfig.data = {
    FirmID: data.FIRMID,
    AccountID: data.clientCode,
    AsOnDate: moment().format("YYYY-MM-DD"),
    Exchange: "NSE",
    // BSE, MCX, NCDEX, NSE
    Segment: "FNO",
    // FNO, COM, CUR
    // "Instrument":"FUTBLN",
    // "Symbol":"ALL",
    // "ExpiryDate":"2023-08-23",
    // "StrikePrice":233.33,
    OptionType: "CE",
    // CE, PE
    ReportType: "CLIENT",
    IgnoreZeroPosition: "N",
    // Y, N
    QtyInLot: "Y",
  };

  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const myClientsReportAPI = async (data) => {
  // let apiConfig = null
  // if (data.reportType == "contractNotes") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.contractNotesLIST));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/ContractNoteWeb/Post`;
  //   apiConfig.data ={
  //     "AccountID":data.clientCode,
  //     FromDate: `${moment().format("YYYY")}-04-01`,
  //     ToDate: moment().format("YYYY-MM-DD"),
  //   }
  // } else if (data.reportType == "clientMaster") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.myClientsReportAPI));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Masters/ClientMasterDetail/Get?Code=${data.clientCode || "01MJE10"}&ClientType=A`;
  // } else if (data.reportType == "holdings") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientHoldingAPI));
  //   apiConfig.data ={}
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/ClientHolding/Post`;
  //   apiConfig.data.AccountID = data.clientCode;
  //   apiConfig.data.AsOnDate = moment().format("YYYY-MM-DD");
  //   apiConfig.data.ExportFormat =1;
  // } else if (data.reportType == "ledger") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.combinedFinanceLedger));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FinancialLedger/Post`;
  //   apiConfig.data ={
  //     "AccountID":data.clientCode,
  //     FromDate: `${moment().format("YYYY")}-04-01`,
  //     ToDate: moment().format("YYYY-MM-DD"),
  //     "Exchange":"ALL",
  //     "Segment":"ALL",
  //     "Product":"DEF",
  //     "ExportFormat": 1
  //   }
  // } else if (data.reportType == "marginReport") {
  // } else if (data.reportType == "profiltAndLoss") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.profitLossReport));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FIFONetPositionReport/Post`;
  //   apiConfig.data ={
  //     "AccountID":data.clientCode,
  //     FromDate: `${moment().format("YYYY")}-04-01`,
  //     ToDate: moment().format("YYYY-MM-DD"),
  //     "SegmentID":"FNO",
  //     "ReportType":"R2",
  //     "IncludeExpence":"Y",
  //     "ExportFormat":1
  //   }
  // } else if (data.reportType == "shortTermAndLongTermGain") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.shortTermAndLongTermGain));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FIFONetPositionReport/Post`;
  //   apiConfig.data ={
  //     "AccountID":data.clientCode,
  //     FromDate: `${moment().format("YYYY")}-04-01`,
  //     ToDate: moment().format("YYYY-MM-DD"),
  //     "RateDate":moment().format("YYYY-MM-DD"),
  //     "OnMarketRate":moment().format("YYYY-MM-DD"),
  //     "ExportFormat": 1
  //   }
  // } else if (data.reportType == "trade") {
  //   apiConfig = JSON.parse(JSON.stringify(KorpAPI.trade));
  //   apiConfig.url = process.env.KORP_BASE_URL + `/Reports/EquityTradeBook/Post`;
  //   apiConfig.data ={
  //     "AccountID":data.clientCode,
  //     FromDate: `${moment().format("YYYY")}-04-01`,
  //     ToDate: moment().format("YYYY-MM-DD"),
  //     "Exchange":"NSE",
  //     "Segment":"CAP",
  //     "ReportType":"NORMAL",
  //     "ExportFormat":1
  //   }
  // }
  // apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  // if (data.FIRMID) {
  //   apiConfig.headers.FIRMID = data.FIRMID;
  //   apiConfig.data["FirmID"] = data.FIRMID;
  // }
  // if (data.BRANCH) {
  //   apiConfig.data.IntroCode = data.BRANCH;
  // }
  // if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  // delete data.token;
  // // apiConfig.data = data;
  // console.log("apiConfig====", apiConfig);
  // return await Rest.callApi(apiConfig);
};

const myRevenueReportAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.myRevenueReportAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/IntroBrokReport/Post";
  apiConfig.headers.Authorization = `Bearer ${data.token}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  apiConfig.data = {
    FromDate:
      (data.fromDate && moment(data.fromDate).format("YYYY-MM-DD")) ||
      `${moment().format("YYYY")}-04-01`,
    ToDate:
      (data.toDate && moment(data.toDate).format("YYYY-MM-DD")) ||
      moment().format("YYYY-MM-DD"),
    Exchange: data.Exchange || "NSE",
    Segment: data.Segment || "CAP",
    ReportType: "COMBINESEG",
    // DATE_CLIENT, CLIENT, DATE, COMBINESEG, INTRO_INTRO2_CLIENT
  };

  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const getApprovedWithdrawalAmountAPI = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(KorpAPI.getApprovedWithdrawalAmountAPI)
  );
  apiConfig.url = process.env.KORP_BASE_URL + "/Vouchers/APAmount/Get";
  apiConfig.headers.Authorization = `Bearer ${data.token}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  const queryString = `?AccountID=${
    data.clientCode || ""
  }&RequestType=ONREQUEST&ReleaseFlag=N`;
  apiConfig.url = apiConfig.url + queryString;

  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const getClientbankDetailsAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.getClientbankDetailsAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Masters/BankDetail/Get";
  apiConfig.headers.Authorization = `Bearer ${data.token}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  const queryString = `?Code=${data.clientCode || ""}&BankID=&BankType=D`;
  apiConfig.url = apiConfig.url + queryString;
  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const clientWithdrawalRequestAPI = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(KorpAPI.clientWithdrawalRequestAPI)
  );
  apiConfig.url = process.env.KORP_BASE_URL + "/Vouchers/PaymentRequest/Post";
  apiConfig.headers.Authorization = `Bearer ${data.token}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  apiConfig.data = {
    FirmID: "1001",
    RequestDate: moment().format("YYYY-MM-DD"),
    AccountID: data.clientCode,
    Amount: data.amount,
    APAmount: data.clientCode,
    BankAccountNo: data.BankAccountNo,
    PaymentMode: "NEFT",
    // NEFT,RTGS,FT
    BankCode: data.BankCode,
    PaymentRequestType: "ONREQUEST",
  };
  delete data.token;
  // apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

module.exports = {
  authenticationAPI,
  clientProfileAPI,
  clientDashboardAPI,
  clientMasterAPI,
  clientHoldingAPI,
  clientListAPI,
  clientWithMarginShortFallAPI,
  topPerformingClientAPI,
  myBrokerageRevenueAPI,
  myClientsReportAPI,
  clientPositionsAPI,
  myRevenueReportAPI,
  getApprovedWithdrawalAmountAPI,
  getClientbankDetailsAPI,
  clientWithdrawalRequestAPI,
};
