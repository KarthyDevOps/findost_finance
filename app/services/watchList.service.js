const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { WatchList } = require("../models/watchList");

const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
} = require("../helpers/index");
const { getWatchListList } = require("./list.service");
const createWatchListService = async (params) => {
  var newvalues = params;
  const resp = await WatchList.create(newvalues);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.created,
    data: {
      _id: resp?._id,
    },
  };
};

const getWatchListService = async (params) => {
  var payload = {
    _id: params?.watchListId || params.id,
    isDeleted: false,
  };
  const resp = await WatchList.findOne(payload);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const updateWatchListService = async (params) => {
  var payload = {
    _id: params?.watchListId || params.id,
    isDeleted: false,
  };
  delete params["watchListId"];
  var newvalues = {
    $set: params,
  };
  const resp = await WatchList.updateOne(payload, newvalues);
  if (!resp.modifiedCount) {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.somethingWrong,
      data: [],
    };
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.updated,
    data: [],
  };
};

const watchListListService = async (params) => {
  params.all = true;
  const allList = await getWatchListList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getWatchListList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};


// export related api's

module.exports = {
  createWatchListService,
  getWatchListService,
  updateWatchListService,
  watchListListService,
 
};
