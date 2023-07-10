
let { Rest } = require("./../restCalls");
let { KorpAPI } = require("../configs");
const qs = require('qs');

const authenticationAPI = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(KorpAPI.authenticationAPI)
  );
  apiConfig.url = process.env.KORP_BASE_URL+"/token"
  let payload = qs.stringify({
    Username : process.env.KORP_USER_NAME,
    Password : process.env.KORP_PASSWORD,
    Grant_type : "password"
  });
  apiConfig.data = payload 
  console.log('apiConfig====',apiConfig)
  return await Rest.callApi(apiConfig);
};


const clientProfileAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(KorpAPI.clientProfileAPI)
    );
    apiConfig.url = process.env.KORP_BASE_URL+"/Reports/ClientProfile/Get"
    const queryString = `?ClientCode=${data.ClientCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    apiConfig.headers.Authorization = `?Bearer ${data.token || ""}`;
    return await Rest.callApi(apiConfig);
  };

  const clientDashboardAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(KorpAPI.clientDashboardAPI)
    );
    apiConfig.url = process.env.KORP_BASE_URL+"/Common/ClientDashBoard/Get"
    const queryString = `?ClientCode=${data.ClientCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    apiConfig.headers.Authorization = `?Bearer ${data.token || ""}`;
    console.log('apiConfig====',apiConfig)
    return await Rest.callApi(apiConfig);
  };

  const clientMasterAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(KorpAPI.clientMasterAPI)
    );
    apiConfig.url = process.env.KORP_BASE_URL+"/Masters/ClientMasterDetail/Get"
    const queryString = `?Code=${data.Code || ""}&ClientType=${data.ClientType || "A"}`;
    apiConfig.url = apiConfig.url + queryString;
    apiConfig.headers.Authorization = `?Bearer ${data.token || ""}`;
    console.log('apiConfig====',apiConfig)
    return await Rest.callApi(apiConfig);
  };

module.exports = {
    authenticationAPI,
    clientProfileAPI,
    clientDashboardAPI,
    clientMasterAPI
};
