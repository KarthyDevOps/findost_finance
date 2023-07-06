
let { Rest } = require("./../restCalls");
let { AccordFintechAPI } = require("../configs");

const categoryListAPI = async (data) => {
  let apiConfig = JSON.parse(
    JSON.stringify(AccordFintechAPI.categoryListAPI)
  );
  const queryString = `?token=${data.token || ""}&Fund=${data.Fund || ""}`;
  apiConfig.url = apiConfig.url + queryString;
  return await Rest.callApi(apiConfig);
};

const categoryReturnsAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.categoryReturnsAPI)
    );
    const queryString = `?token=${data.token || ""}&OptionType=${data.OptionType || ""}&Type=${data.Type || "Commodity"}&PageNo=${data.PageNo || 1}&Pagesize=${data.Pagesize || 10}&SortExpression=${data.SortExpression || ""}&SortDirection=${data.SortDirection || "Desc"}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
  };

const schemesListAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.schemesListAPI)
    );
    const queryString = `?token=${data.token || ""}&Fund=${data.Fund || ""}&Category=${data.Category || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

const getSchemesFilteredListAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.getSchemesFilteredListAPI)
    );
    const queryString = `?SchemeCode=${data.SchemeCode  || ""}&AmcCo
    de=${data.AmcCode || ""}&AssetType=${data.AssetType || ""}&CatCode=${data.Catcode || ""}&Risk=${data.Risk || ""}&OptCode=${OptCode || ""}&PlanTy
    pe=${data.PlanType || ""}&SortExp=${data.SortExp || ""}&SortDir=${data.SortDir || ""}&PageNo=${data.PageNo || 1}&PageSize=${PageSize || 1000000}&token=${
        data.token || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

const getSchemeNAVDetailsAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.getSchemeNAVDetailsAPI)
    );
    const queryString = `?token=${data.token || ""}&SchemeCode=${data.SchemeCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};
const getMFSnapshotDetailsAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.getMFSnapshotDetailsAPI)
    );
    const queryString = `?token=${data.token || ""}&SchemeCode=${data.SchemeCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};
const getSystematicInvestmentpatternAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.getSystematicInvestmentpatternAPI)
    );
    const queryString = `?token=${data.token || ""}&SchemeCode=${data.SchemeCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};
const allHoldingsAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.allHoldingsAPI)
    );
    const queryString = `?token=${data.token || ""}&SchemeCode=${data.SchemeCode || ""}&Top=${data.Top || ""}&PageNo=${data.PageNo || 1}&Pagesize=${data.Pagesize || 10}&SortExpression=${data.SortExpression || ""}&SortDirection=${data.SortDirection || 'Desc'}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

const ipoIssueAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.ipoIssueAPI)
    );
    const queryString = `?token=${data.token || ""}&PageNo=${data.PageNo || 1}&PageSize=${data.PageSize || 10}&SortExpression=${data.SortExpression || ""}&SortDirection=${data.SortDirection || "Desc"}&Proc=${data.Proc || "IPO_GET_FORTHCOMINGISSUE"}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};


const NFOUpdatesAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.NFOUpdatesAPI)
    );
    const queryString = `?token=${data.token || ""}&PageNo=${data.PageNo || 1}&PageSize=${data.PageSize || 10}&SortExp=${data.SortExp || ""}&SortDirect=${data.SortDirect || "Desc"}&FundCode=${data.FundCode || ""}&CatCode=${data.CatCode || ""}&Option=${data.Option || "ENFO"}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

const ipoNewListingAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.ipoNewListingAPI)
    );
    const queryString = `?token=${data.token || ""}&EXCHG=${data.EXCHG || "NSE"}&Top=${data.Top || ""}&PageNo=${data.PageNo || 1}&PageSize=${data.PageSize || 10}&SortExpression=${data.SortExpression || ""}&SortDirection=${data.SortDirection || "Desc"}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

const ipoSnapshotAPI = async (data) => {
    let apiConfig = JSON.parse(
      JSON.stringify(AccordFintechAPI.ipoSnapshotAPI)
    );
    const queryString = `?token=${data.token || ""}&FinCode=${data.FinCode || ""}`;
    apiConfig.url = apiConfig.url + queryString;
    return await Rest.callApi(apiConfig);
};

module.exports = {
    categoryListAPI,
    categoryReturnsAPI,
    schemesListAPI,
    getSchemesFilteredListAPI,
    getSchemeNAVDetailsAPI,
    getMFSnapshotDetailsAPI,
    getSystematicInvestmentpatternAPI,
    allHoldingsAPI,

    ipoIssueAPI,
    ipoNewListingAPI,
    ipoSnapshotAPI,
    NFOUpdatesAPI
};
