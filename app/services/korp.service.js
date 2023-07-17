const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    KORPAPIServices
} = require("../externalServices");
const authenticationService = async (params) => {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: {
        token : params.token
      }
    };
};

const clientProfileService = async (params) => {
    let resp = await KORPAPIServices.clientProfileAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp
    };
};
const clientDashboardService = async (params) => {
    let resp = await KORPAPIServices.clientDashboardAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp
    };
};
const clientMasterService = async (params) => {
    let resp = await KORPAPIServices.clientMasterAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data:resp
    };
};
const clientHoldingService = async (params) => {
  let resp = await KORPAPIServices.clientHoldingAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data:resp
  };
};

module.exports = {
    authenticationService,
    clientProfileService,
    clientDashboardService,
    clientMasterService,
    clientHoldingService
};
