const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { IPOAPIServices } = require("../externalServices");
const { cmsIpoDates } = require("../models/cmsIpoDates");

const moment = require("moment");

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

const cmsIpoUpdateService = async (params) => {
  let cmsIpoDatesList = await cmsIpoDates.findOneAndUpdate(
    { ipoisinNumber: params.ipoisinNumber },
    {
      ipoisinNumber: params.ipoisinNumber,
      ipoDoc: params.ipoDoc,
      allotmnetDate: params.allotmnetDate,
      refundInitiation: params.refundInitiation,
      listingOnExchange: params.listingOnExchange,
    },
    { upsert: true, new: true }
  );
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: cmsIpoDatesList,
  };
};

const ipoMasterService = async (params) => {
  let resp = await IPOAPIServices.ipoMasterAPI(params.token, params);
  let result = [];
  if (resp && resp.data && resp.data.length > 0) {
    console.log(resp, "resp");
    let cmsIpoDatesObj = {};
    let cmsIpoDatesList = await cmsIpoDates.find({ isDeleted: false });
    cmsIpoDatesList.map((data) => {
      cmsIpoDatesObj[data.ipoisinNumber] = data;
    });
    result = resp.data.map((data) => {
      if (
        new Date().getTime() > new Date(moment(data.biddingStartDate)).getTime()
      ) {
        data.status = "OPEN";
      } else {
        data.status = "UPCOMMING";
      }
      if (cmsIpoDatesObj[data.isin]) {
        data = { ...data, ...cmsIpoDatesObj[data.isin] };
      } else {
        data.ipoisinNumber = null;
        data.ipoDoc = null;
        data.allotmnetDate = null;
        data.refundInitiation = null;
        data.listingOnExchange = null;
      }
      return { ...data };
    });
  }

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};

module.exports = {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
  cmsIpoUpdateService,
};
