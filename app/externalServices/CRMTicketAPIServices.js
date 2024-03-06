let { Rest } = require("./../restCalls");
let { CRMTicketAPI } = require("../configs");
const qs = require("qs");
const moment = require("moment");
const CRMTicketAuthenticationAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(CRMTicketAPI.authenticationAPI));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/security/createtoken";
  let payload = {
    userName: process.env.CRM_TICKET_USER_NAME,
    password: process.env.CRM_TICKET_PASSWORD,
  }
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const createTicketAPI = async (token ,data) => {
  let apiConfig = JSON.parse(JSON.stringify(CRMTicketAPI.crmTicketCreateNewTicket));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/newticket";
  apiConfig.headers["Authorization"] =  `Bearer ${token}`
  apiConfig.data = data;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

const ticketStatusAPI = async (token ,data) => {
  let apiConfig = JSON.parse(JSON.stringify(CRMTicketAPI.crmTicketStatus));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/ticketstatus";
  apiConfig.headers["Authorization"] =  `Bearer ${token}`
  let payload ={
        "UserID": data.userid,
        "TicketID":data.ticketid
    }
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};
const accountOpeningDashboardListAPI = async (token ,data) => {
  console.log('--------------',data)
  let apiConfig = JSON.parse(JSON.stringify(CRMTicketAPI.accountOpeningDashboardListAPI));
  apiConfig.url = process.env.CRM_TICKET_BASE_URL + "/GetSubbrokerData";
  apiConfig.headers["Authorization"] =  `Bearer ${token}`
  let payload ={
    "FromDate":"01-04-2023",
    "Todate":moment().format("DD-MM-YYYY"),
    "Status":data.status || "ALL",//ALL/Rejected/InProcess/Completed
    //"SubbrokerID": data.APId || "17HS"
    }
  apiConfig.data = payload;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

module.exports = {
  CRMTicketAuthenticationAPI,
  createTicketAPI,
  ticketStatusAPI,
  accountOpeningDashboardListAPI
};
