
let { Rest } = require("./../restCalls");
let { thirdPartyAPI, InternalAPIs } = require("../configs");
const crmTicketTokenCreate = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(thirdPartyAPI.crmTicketTokenCreate)
  );
  return await Rest.callApi(apiConfig);
};
const crmTicketCreateNewTicket = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(thirdPartyAPI.crmTicketCreateNewTicket)
  );
  apiConfig.data = data
  return await Rest.callApi(apiConfig);
};
const crmTicketStatus = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(thirdPartyAPI.crmTicketStatus)
  );
  apiConfig.data = data
  return await Rest.callApi(apiConfig);
};
module.exports = {
    crmTicketTokenCreate,
    crmTicketCreateNewTicket,
    crmTicketStatus
};
