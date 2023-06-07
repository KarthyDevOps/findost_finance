const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { Leads } = require("../models/leads");
const {
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");
const createLeadsService = async (params) => {
    const resp = await Leads.create(params);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: {
        _id: resp?._id,
      },
    };
};

module.exports = {
    createLeadsService
};
