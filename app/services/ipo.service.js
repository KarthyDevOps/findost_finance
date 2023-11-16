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
    let cmsIpoDatesList = await cmsIpoDates.find({ isDeleted: false }).lean();
    cmsIpoDatesList.map((data) => {
      cmsIpoDatesObj[data.ipoisinNumber] = {
        ...data,
        allotmnetDate: moment(data.allotmnetDate).format("YYYY-MM-DD"),
        refundInitiation: moment(data.refundInitiation).format("YYYY-MM-DD"),
        listingOnExchange: moment(data.listingOnExchange).format("YYYY-MM-DD"),
      };
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

const buyIPOService = async (params) => {
  let payload = {
    "symbol":params.symbol,
    "applicationNumber":params.applicationNumber,
    "category": params.category,
    "clientName":params.clientName,
    "depository": params.depository,
    "dpId": params.dpId,
    "clientBenId": params.clientBenId,
    "nonASBA": false,
    "pan":params.pan,
    "referenceNumber": params.referenceNumber,
    "allotmentMode": "demat",
    "upiFlag": "Y",
    "upi": params.upi,
    "bankCode": null,
    "locationCode": null,
    "timestamp":new Date(),
    "bids": [
        {
            "activityType": "new",
            "quantity": 100,
            "atCutOff": false,
            "price": 55.30,
            "amount": 5530.00,
            "remark": "BD/000001"
        }
    ]
}
  let resp = await IPOAPIServices.buyIPOAPI(params.token, payload);
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
  cmsIpoUpdateService,
  buyIPOService,
};
