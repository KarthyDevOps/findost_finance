const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { Leads } = require("../models/leads");
const {
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");

const { getLeadList } = require('./list.service')

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

const leadListService = async (params) => {
  params.all = true;
  const allList = await getLeadList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getLeadList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};


module.exports = {
  createLeadsService,
  leadListService
};
