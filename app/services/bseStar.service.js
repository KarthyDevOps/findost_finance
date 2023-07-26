const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    BSESTARAPIServices
} = require("../externalServices");
const bseStarAuthenticationService = async (params) => {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: {
        token : params.token
      }
    };
};

const bseStarSipCreateService = async (params) => {
    let resp = await BSESTARAPIServices.bseStarSipCreateAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp
    };
};
const bseStarLumpsumCreateService = async (params) => {
    let resp = await BSESTARAPIServices.bseStarLumpsumCreateAPI(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp
    };
};


module.exports = {
    bseStarAuthenticationService,
    bseStarSipCreateService,
    bseStarLumpsumCreateService,
};
