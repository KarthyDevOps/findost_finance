const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { KORPAPIServices } = require("../externalServices");
const authenticationService = async (params) => {
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: {
      token: params.token,
    },
  };
};

const clientDetailsService = async (params) => {
  data = await Promise.all([
    KORPAPIServices.clientProfileAPI(params),
    KORPAPIServices.clientDashboardAPI(params),
    KORPAPIServices.clientMasterAPI(params),
  ]).then(function (values) {
    let clientProfile = values?.[0];
    let clientDashboard = values?.[1];
    let clientMaster = values?.[2];
    segmentObj = {};
    clientProfile.SegmentMaster.map((a) => {
      if (!segmentObj[a.SegmentID]) {
        segmentObj[a.SegmentID] = [];
      }
      segmentObj[a.SegmentID].push(a);
    });
    let segmentResp = [];
    Object.keys(segmentObj).map((key) => {
      let resp = {
        segmentName: segmentObj[key][0].SegmentName,
        segmentCode: key,
        list: [],
      };
      segmentObj[key].map((value) => {
        var status = "INACTIVE";
        if (
          value.ActiveDate &&
          new Date() >= new Date(value.ActiveDate) &&
          (!value.InactiveDate || new Date() < new Date(value.InactiveDate))
        ) {
          status = "ACTIVE";
        }
        resp.list.push({
          exchangeID: value.ExchangeID,
          segmentCode: key,
          exchangeName: value.ExchangeName,
          status: status,
          ActiveDate: value.ActiveDate,
          InactiveDate: value.InactiveDate,
        });
      });

      segmentResp.push(resp);
    });
    let resp = {
      ledgerBalance: {
        balance: clientDashboard?.FinSummary[0]?.LedgerBalance || 0,
        date: new Date(),
      },
      personalInfo: clientProfile.MasterData[0],
      bankDetails: clientProfile.BankDetail,
      DPDetail: clientProfile.DPDetail[0],
      nomineeDetail: clientProfile.NomineeDetail,
      segmentDetails: segmentResp,
    };
    return resp;
  });

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: data,
  };
};
const clientProfileService = async (params) => {
  let resp = await KORPAPIServices.clientProfileAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const clientDashboardService = async (params) => {
  let resp = await KORPAPIServices.clientDashboardAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const clientMasterService = async (params) => {
  let resp = await KORPAPIServices.clientMasterAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const clientHoldingService = async (params) => {
  let resp = await KORPAPIServices.clientHoldingAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const clientListService = async (params) => {
  let newParams = params
  let resp = await KORPAPIServices.clientListAPI({...params});
  let result = [];

  if (resp) {
    for (let res of resp) {
      if(params.status == "ACTIVE")
      {
        if(res.AcStatus == "Active")
        {
          params.clientCode = res.AccountID;
          console.log('params',params)
          let profileResp = await KORPAPIServices.clientProfileAPI({...params});
          res.Address1 = profileResp?.MasterData[0]?.Address1 || "";
          res.Address2 = profileResp?.MasterData[0]?.Address2 || "";
          res.Address3 = profileResp?.MasterData[0]?.Address3 || "";
          res.City = profileResp?.MasterData[0]?.City || "";
          res.District = profileResp?.MasterData[0]?.District || "";
          res.PINCode = profileResp?.MasterData[0]?.PINCode || "";
          res.StateCode = profileResp?.MasterData[0]?.StateCode || "";
          res.StateName = profileResp?.MasterData[0]?.StateName || "";
          res.CountryCode = profileResp?.MasterData[0]?.CountryCode || "";
          result.push(res);
        }
      }
      else if(params.status == "INACTIVE")
      {
        if(res.AcStatus == "Inactive")
        {
          params.clientCode = res.AccountID;
          console.log('params',params)
          let profileResp = await KORPAPIServices.clientProfileAPI({...params});
          res.Address1 = profileResp?.MasterData[0]?.Address1 || "";
          res.Address2 = profileResp?.MasterData[0]?.Address2 || "";
          res.Address3 = profileResp?.MasterData[0]?.Address3 || "";
          res.City = profileResp?.MasterData[0]?.City || "";
          res.District = profileResp?.MasterData[0]?.District || "";
          res.PINCode = profileResp?.MasterData[0]?.PINCode || "";
          res.StateCode = profileResp?.MasterData[0]?.StateCode || "";
          res.StateName = profileResp?.MasterData[0]?.StateName || "";
          res.CountryCode = profileResp?.MasterData[0]?.CountryCode || "";
          result.push(res);
        }
      }
      else
      {
        params.clientCode = res.AccountID;
        console.log('params',params)
        let profileResp = await KORPAPIServices.clientProfileAPI({...params});
        res.Address1 = profileResp?.MasterData[0]?.Address1 || "";
        res.Address2 = profileResp?.MasterData[0]?.Address2 || "";
        res.Address3 = profileResp?.MasterData[0]?.Address3 || "";
        res.City = profileResp?.MasterData[0]?.City || "";
        res.District = profileResp?.MasterData[0]?.District || "";
        res.PINCode = profileResp?.MasterData[0]?.PINCode || "";
        res.StateCode = profileResp?.MasterData[0]?.StateCode || "";
        res.StateName = profileResp?.MasterData[0]?.StateName || "";
        res.CountryCode = profileResp?.MasterData[0]?.CountryCode || "";
        result.push(res);
      }
      

      // if(params.status == "ACTIVE")
      // {
      //   if(res.AcStatus == "Active")
      //   {
      //     result.push(res);
      //   }
      // }
      // else if(params.status == "INACTIVE")
      // {
      //   if(res.AcStatus == "Inactive")
      //   {
      //     result.push(res);
      //   }
      // }
      // else
      // {
      //   result.push(res);
      // }
      
    }
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const clientWithMarginShortFallService = async (params) => {
  let resp = await KORPAPIServices.clientWithMarginShortFallAPI({...params});
  let result = [];

  if (resp) {
    for (let res of resp.DRCRData) {
      params.clientCode = res.AccountID;
      let profileResp = await KORPAPIServices.clientProfileAPI({...params});
      res.MobileNo = profileResp?.MasterData[0]?.MobileNo || "";
      res.PhoneNo = profileResp?.MasterData[0]?.PhoneNo || "";
     
      result.push(res);
    }
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const topPerformingClientService = async (params) => {
  let resp = await KORPAPIServices.topPerformingClientAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};


module.exports = {
  authenticationService,
  clientDetailsService,
  clientProfileService,
  clientDashboardService,
  clientMasterService,
  clientHoldingService,
  clientListService,
  clientWithMarginShortFallService,
  topPerformingClientService
};
