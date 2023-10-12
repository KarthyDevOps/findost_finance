const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { KORPAPIServices } = require("../externalServices");
let xmlParser = require('xml2json');
const moment = require("moment");
const { pageMetaService } = require("../helpers/index");


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
  const getMarketTime = (()=>{
    let date = moment().format('YYYY-MM-DD hh:mm:ss')
    if(new Date().getDay() == 0 || new Date().getDay() == 6)
    {
      var time = "18:00";
      const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7 ;
      const lastFriday = new Date();
      lastFriday.setDate(t);
      
      date = moment(lastFriday).format('YYYY-MM-DD')
      date =  moment(date + ' ' + time);
    }
    
    return date
  }) 
  resp.overall ={
      asOnDate : getMarketTime(),
      totalInvestment : 0,
      totalCurrentValue : 0,
      overAllPLValue : 0,
      //overAllPLPercentage : 0,
    }
    let totalInvestment = 0 
    let totalCurVal = 0 

    resp.data.map((res1)=>{
      totalInvestment = totalInvestment + (res1.TotalHolding * res1.BuyAvg);
      totalCurVal = totalCurVal + (res1.TotalHolding * res1.CloseRate)
    })
    resp.overall.totalInvestment = totalInvestment
    resp.overall.totalCurrentValue = totalCurVal
    resp.overall.overAllPLValue = totalCurVal - totalInvestment

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
    if(params.sort =="ascending")
      {
        resp.sort((a,b) => (a.AccountName > b.AccountName) ? 1 : ((b.AccountName > a.AccountName) ? -1 : 0))

      }
      else if(params.sort =="descending")
      {
        resp.sort((a,b) => (a.AccountName > b.AccountName) ? -1 : ((b.AccountName > a.AccountName) ? 1 : 0))

      }
      
    resp =resp.slice(params.page,params.page+params.limit)
    console.log(resp)
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
   
    }
  }
  

  const pageMeta = await pageMetaService(params, result.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
   data: { list:  result || [], pageMeta },
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
  result  = result.filter((x)=>{
  return x.NetWithMargin < 0
  })

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};

const topPerformingClientService = async (params) => {
  let resp = await KORPAPIServices.topPerformingClientAPI(params);
  let result = []
  if(resp)
  {
    resp =  xmlParser.toJson(resp)
    resp = JSON.parse(resp)
    result = resp.DataSet["diffgr:diffgram"]["NewDataSet"]["Table"] || []
  }
    

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const myBrokerageRevenueService = async (params) => {
  let resp = await KORPAPIServices.myBrokerageRevenueAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const myClientsReportService = async (params) => {
  let resp = await KORPAPIServices.myClientsReportAPI(params);
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
  topPerformingClientService,
  myBrokerageRevenueService,
  myClientsReportService
};
