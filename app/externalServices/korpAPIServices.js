let { Rest } = require("./../restCalls");
let { KorpAPI } = require("../configs");
const qs = require("qs");
const moment = require("moment");

const authenticationAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.authenticationAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/token";
  let payload = qs.stringify({
    Username: process.env.KORP_USER_NAME,
    Password: process.env.KORP_PASSWORD,
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
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.topPerformingClientAPI));
  apiConfig.url =
    process.env.KORP_BASE_URL + "/Reports/TurnoverBrokerageWebReport/Post";
  apiConfig.data = {
    FromDate: `${moment().format("YYYY")}-04-01`,
    ToDate: moment().format("YYYY-MM-DD"),
    Branch: "01AO",
    // "SubBranch":"RTL",
    // "RM":"???",
    // "FamilyGroup":"???",
    ReportType: "DETAIL",
    // ReportType Values - SUMMARY, DETAIL,
    ReportSelection: "CLIENT",
    //ReportSelection values - BRANCH, SUB_BRANCH, TL, RM, CLIENT, BR_SUB_BR, BR_SUB_BR_TL, BR_SUB_BR_TL_RM
    AccountID: data.BRANCH,
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
    FromDate: `${moment().format("YYYY")}-04-01`,
    ToDate: moment().format("YYYY-MM-DD"),
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

const myClientsReportAPI = async (data) => {
  let apiConfig = null 

  if (data.reportType == "contractNotes") {

    apiConfig = JSON.parse(JSON.stringify(KorpAPI.contractNotesLIST));
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/ContractNoteWeb/Post`;
    apiConfig.data ={
      "AccountID":data.clientCode,
      FromDate: `${moment().format("YYYY")}-04-01`,
      ToDate: moment().format("YYYY-MM-DD"),
    }

  } else if (data.reportType == "clientMaster") {
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.myClientsReportAPI));
    apiConfig.url = process.env.KORP_BASE_URL + `/Masters/ClientMasterDetail/Get?Code=${data.clientCode || "01MJE10"}&ClientType=A`;
  } else if (data.reportType == "holdings") {
    
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientHoldingAPI));
    apiConfig.data ={}
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/ClientHolding/Post`;
    apiConfig.data.AccountID = data.clientCode;
    apiConfig.data.AsOnDate = moment().format("YYYY-MM-DD");
    apiConfig.data.ExportFormat =1;
  } else if (data.reportType == "ledger") {
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.combinedFinanceLedger));
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FinancialLedger/Post`;
    apiConfig.data ={
      "AccountID":data.clientCode,
      FromDate: `${moment().format("YYYY")}-04-01`,
      ToDate: moment().format("YYYY-MM-DD"),
      "Exchange":"ALL",
      "Segment":"ALL",
      "Product":"DEF",
      "ExportFormat": 1
    }
  } else if (data.reportType == "marginReport") {
  } else if (data.reportType == "profiltAndLoss") {
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.profitLossReport));
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FIFONetPositionReport/Post`;
    apiConfig.data ={
      "AccountID":data.clientCode,
      FromDate: `${moment().format("YYYY")}-04-01`,
      ToDate: moment().format("YYYY-MM-DD"),
      "SegmentID":"FNO",
      "ReportType":"R2",
      "IncludeExpence":"Y",
      "ExportFormat":1
    }
  } else if (data.reportType == "shortTermAndLongTermGain") {
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.shortTermAndLongTermGain));
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/FIFONetPositionReport/Post`;
    apiConfig.data ={
      "AccountID":data.clientCode,
      FromDate: `${moment().format("YYYY")}-04-01`,
      ToDate: moment().format("YYYY-MM-DD"),
      "RateDate":moment().format("YYYY-MM-DD"),
      "OnMarketRate":moment().format("YYYY-MM-DD"),
      "ExportFormat": 1
    }
  } else if (data.reportType == "trade") {
    apiConfig = JSON.parse(JSON.stringify(KorpAPI.trade));
    apiConfig.url = process.env.KORP_BASE_URL + `/Reports/EquityTradeBook/Post`;
    apiConfig.data ={
      "AccountID":data.clientCode,
      FromDate: `${moment().format("YYYY")}-04-01`,
      ToDate: moment().format("YYYY-MM-DD"),
      "Exchange":"NSE",
      "Segment":"CAP",
      "ReportType":"NORMAL",
      "ExportFormat":1
    }
  }
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
    apiConfig.data["FirmID"] = data.FIRMID;
  }
  if (data.BRANCH) {
    apiConfig.data.IntroCode = data.BRANCH;
  }
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;

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
};
