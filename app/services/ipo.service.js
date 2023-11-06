const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { IPOAPIServices } = require("../externalServices");
const { pageMetaService } = require("../helpers/index");
const ipoLoginService = async (params) => {
  let resp = await IPOAPIServices.ipoLoginAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const ipoTransactionAddService = async (params) => {
  let resp = await IPOAPIServices.ipoTransactionAddAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const ipoTransactionListService = async (params) => {
  let resp = await IPOAPIServices.ipoTransactionListAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const ipoMasterService = async (params) => {
  let resp = await IPOAPIServices.ipoMasterAPI(params.token,params);

  resp = resp.map((data)=>{
   // data.status = 
    return data
  })
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
module.exports = {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
};
