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
  console.log('data------------',data)
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
  console.log('data',data)
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientHoldingAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/ClientHolding/Post";
  apiConfig.data ={}
  apiConfig.headers.Authorization = `Bearer ${data.token || ""}`;
  if (data.FIRMID) {
    apiConfig.headers.FIRMID = data.FIRMID;
    apiConfig.data.FirmID = data.FIRMID;
  }
  apiConfig.data.AccountID  = data.clientCode
  apiConfig.data.AsOnDate  = moment().format('YYYY-MM-DD')

  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  delete data.token;
  apiConfig.data = apiConfig.data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const clientListAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientListAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Masters/ClientDirectory/Post";
  apiConfig.data ={
   
  }
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
  let apiConfig = JSON.parse(JSON.stringify(KorpAPI.clientWithMarginShortFallAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/WEBDebtorCreditorList/Post";
  apiConfig.data ={
    'CrDrFlag' : "NONZERO",
    "IncludeMargin":"Y",
    'AsOnDate'  : moment().format('YYYY-MM-DD')
  }
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
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/WEBDebtorCreditorList/Post";
  apiConfig.data ={
    'CrDrFlag' : "NONZERO",
    "IncludeMargin":"Y",
    'AsOnDate'  : moment().format('YYYY-MM-DD')
  }
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

module.exports = {
  authenticationAPI,
  clientProfileAPI,
  clientDashboardAPI,
  clientMasterAPI,
  clientHoldingAPI,
  clientListAPI,
  clientWithMarginShortFallAPI
};
