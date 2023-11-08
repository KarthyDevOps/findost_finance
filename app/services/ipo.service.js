const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { IPOAPIServices } = require("../externalServices");
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
const ipoMasterService = async (params) => {
  let resp = await IPOAPIServices.ipoMasterAPI(params.token,params);
  let result =[]
  if(resp && resp.data && resp.data.length >0)
  {
    console.log(resp,'resp')
    result = resp.data.map((data)=>{
      if(new Date().getTime() > new Date(moment(data.biddingStartDate)).getTime())
      {
        data.status = "OPEN"
      }
      else
      {
        data.status = "UPCOMMING"
      }
      return data
    })
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
};
