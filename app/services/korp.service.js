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

const clientDetailsService = async (params) => {
  data = await Promise.all([KORPAPIServices.clientProfileAPI(params),KORPAPIServices.clientDashboardAPI(params),KORPAPIServices.clientMasterAPI(params)]).then(function (values) {
    let clientProfile = values?.[0];
    let clientDashboard = values?.[1];
    let clientMaster =  values?.[2]
    segmentObj ={}
    clientProfile.SegmentMaster.map((a)=>{
      if(!segmentObj[a.SegmentID])
      {
        segmentObj[a.SegmentID] = []
      }
      segmentObj[a.SegmentID].push(a)
    })
    let segmentResp =[]
    Object.keys(segmentObj).map((key) =>{
      let resp  ={
        segmentName : segmentObj[key][0].SegmentName,
        segmentCode  : key,
        list :[]
      }
      segmentObj[key].map((value) =>{
        var status =  "INACTIVE";
        if(value.ActiveDate && new Date() >= new Date(value.ActiveDate) && (!value.InactiveDate || new Date() < new Date(value.InactiveDate) ))
        {
           status =  "ACTIVE";
        }
        resp.list.push({
          exchangeID : value.ExchangeID,
          segmentCode : key,
          exchangeName : value.ExchangeName,
          status : status,
          ActiveDate:value.ActiveDate,
          InactiveDate:value.InactiveDate,
        })
      })
      
      segmentResp.push(resp)
    })
    let resp = {
      ledgerBalance : {
        balance : 0,
        date : ""
      },
      personalInfo : clientProfile.MasterData[0],
      bankDetails :  clientProfile.BankDetail,
      DPDetail : clientProfile.DPDetail[0],
      nomineeDetail : clientProfile.NomineeDetail,
      segmentDetails : segmentResp
    }
    return resp   
  });

  
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: data
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
    clientDetailsService,
    clientProfileService,
    clientDashboardService,
    clientMasterService,
    clientHoldingService
};
