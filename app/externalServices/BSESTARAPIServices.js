let { Rest } = require("./../restCalls");
let { bseStarAPI } = require("../configs");
const qs = require("qs");
const bseStarauthenticationAPI = async (data) => {
    var soap = require('soap');
    var url = 'http://example.com/wsdl?wsdl';
    var args = {name: 'value'};

    soap.createClient(url, {}, function(err, client) {
        client.MyFunction(args, function(err, result) {
            console.log(result);
        });
    });
};
const bseStarSipCreateAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(bseStarAPI.bseStarSipCreateAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Reports/ClientProfile/Get";
  const queryString = `?ClientCode=${data.ClientCode || ""}`;
  apiConfig.url = apiConfig.url + queryString;
  apiConfig.headers.Authorization = `?Bearer ${data.token || ""}`;
  if (data.FIRMID) apiConfig.headers.FIRMID = data.FIRMID;
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  return await Rest.callApi(apiConfig);
};
const bseStarLumpsumCreateAPI = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(bseStarAPI.bseStarLumpsumCreateAPI));
  apiConfig.url = process.env.KORP_BASE_URL + "/Common/ClientDashBoard/Get";
  const queryString = `?ClientCode=${data.ClientCode || ""}`;
  apiConfig.url = apiConfig.url + queryString;
  apiConfig.headers.Authorization = `?Bearer ${data.token || ""}`;
  if (data.FIRMID) apiConfig.headers.FIRMID = data.FIRMID;
  if (data.FINANCIALYEAR) apiConfig.headers.FINANCIALYEAR = data.FINANCIALYEAR;
  console.log("apiConfig====", apiConfig);
  return await Rest.callApi(apiConfig);
};

module.exports = {
    bseStarauthenticationAPI,
  bseStarSipCreateAPI,
  bseStarLumpsumCreateAPI,
  
};
