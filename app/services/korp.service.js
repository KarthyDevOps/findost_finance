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

module.exports = {
    authenticationService,
    
};
