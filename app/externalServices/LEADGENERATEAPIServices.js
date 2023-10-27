let { Rest } = require("./../restCalls");
let { LEADAPI } = require("../configs");
const qs = require("qs");

const LeadAuthenticationAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(LEADAPI.authenticationAPI));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/security/createtoken";
  let payload = {
    userName: process.env.CRM_TICKET_USER_NAME,
    password: process.env.CRM_TICKET_PASSWORD,
  }
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const createLeadAPI = async (token ,data) => {
  let apiConfig = JSON.parse(JSON.stringify(LEADAPI.leadCreateAPI));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/newlead";
  apiConfig.headers["Authorization"] =  `Bearer ${token}`
  apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};


module.exports = {
    LeadAuthenticationAPI,
    createLeadAPI
};
