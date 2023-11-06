let { Rest } = require("./../restCalls");
let { IPOAPI } = require("../configs");
const qs = require("qs");

const ipoLoginAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(IPOAPI.ipoLoginAPI));
  apiConfig.url = process.env.IPO_BASE_URL + "/v1/login";
  let payload = {
    member: process.env.IPO_MEMBERID,
    loginId: process.env.IPO_LOGIN_ID,
    password: process.env.IPO_PASSWORD,
  }
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const ipoTransactionListAPI = async (token ,data) => {
  let apiConfig = JSON.parse(JSON.stringify(IPOAPI.ipoTransactionListAPI));
  apiConfig.url = process.env.IPO_BASE_URL + "/newticket";
  apiConfig.headers["Authorization"] =  `Bearer ${token}`
  apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const ipoMasterAPI = async (token ,data) => {
  let apiConfig = JSON.parse(JSON.stringify(IPOAPI.ipoMasterAPI));
  apiConfig.url = process.env.IPO_BASE_URL + "/v1/ipomaster";
  apiConfig.headers["Access-Token"] =  `${token}`
 
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const ipoTransactionAddAPI = async (token ,data) => {
    let apiConfig = JSON.parse(JSON.stringify(IPOAPI.ipoTransactionAddAPI));
    apiConfig.url = process.env.IPO_BASE_URL + "/ticketstatus";
    apiConfig.headers["Authorization"] =  `Bearer ${token}`
    let payload ={
          "UserID": data.userid,
          "TicketID":data.ticketid
      }
    apiConfig.data = payload;
    console.log("apiConfig====", apiConfig);
    return await Rest.callApi(apiConfig);
  };
module.exports = {
    ipoLoginAPI,
    ipoTransactionListAPI,
    ipoMasterAPI,
    ipoTransactionAddAPI
};
