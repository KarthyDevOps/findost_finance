const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { KORPAPIServices } = require("../externalServices");
const { verifyUPI, VerifyVPA  } = require('bhimupijs');

const moment = require("moment");
const { pageMetaService } = require("../helpers/index");

const {
  TurnoverBrokerageReport,
} = require("../models/turnoverBrokerageReport");
const {
  FranchiseBrokerageReport,
} = require("../models/franchiseBrokerageReport");


function capitalizeFLetter(string) {

      return string.charAt(0).toUpperCase() + string.slice(1)
}

function convertToArray(value) {
  if (Array.isArray(value)) {
    // If it's already an array, return it as is
    return value;
  } else if (typeof value === "object") {
    // If it's an object, convert it into an array of objects
    return [value];
  } else {
    // For any other data type, create an empty array
    return [];
  }
}

const dateList = (type, params) => {
  var months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  let report = {};
  console.log(type);
  if (type == "YEAR" || type == "QUARTER") {
    let start_day = new Date(
      new Date(params.startDate).setHours(0, 0, 0, 0)
    ).getTime();
    let st_day = start_day;
    let end_day = new Date(
      new Date(params.endDate).setHours(23, 59, 59, 0)
    ).getTime();
    while (st_day < end_day) {
      var mon = new Date(st_day).getMonth(),
        year = new Date(st_day).getFullYear();
      var st = moment(st_day).startOf("month").format("YYYY-MM-DD"),
        ed = moment(st_day).endOf("month").format("YYYY-MM-DD");
      var idx = [st, ed].join(" - ");
      report[idx] = {
        text: [months[mon + 1], year].join(" "),
        date: {
          start: moment(st).format("YYYY-MM-DD"),
          end: moment(ed).format("YYYY-MM-DD"),
        },
        resp: {},
      };
      // Increase
      st_day = new Date(year, mon + 1, 1).getTime();
    }
  } else if (type == "MONTH") {
    let start_day = new Date(
      new Date(params.startDate).setHours(0, 0, 0, 0)
    ).getTime();
    let st_day = start_day;
    let end_day = new Date(
      new Date(params.endDate).setHours(23, 59, 59, 0)
    ).getTime();
    while (st_day < end_day) {
      var d = moment(st_day).format("YYYY-MM-DD");
      report[d] = {
        text: d,
        date: {
          start: moment(d).format("YYYY-MM-DD"),
          end: moment(d).format("YYYY-MM-DD"),
        },
        resp: {},
      };
      st_day += 24 * 60 * 60 * 1000;
    }
  } else {
    //week
    let start_day = new Date(
      new Date(params.startDate).setHours(0, 0, 0, 0)
    ).getTime();
    let st_day = start_day;
    let end_day = new Date(
      new Date(params.endDate).setHours(23, 59, 59, 0)
    ).getTime();
    while (st_day < end_day) {
      var d = moment(st_day).format("YYYY-MM-DD");
      report[d] = {
        text: d,
        date: {
          start: moment(d).format("YYYY-MM-DDT00:00:00.000"),
          end: moment(d).format("YYYY-MM-DDT23:59:59.000"),
        },
        resp: {},
      };
      st_day += 24 * 60 * 60 * 1000;
    }
  }
  return report;
};

const authenticationService = async (params) => {
  let resp = await KORPAPIServices.authenticationAPI(params);
  if (!resp.access_token) {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: {
        token: params.token,
      },
    };
  } else {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp,
    };
  }
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
  const getMarketTime = () => {
    let date = moment().format("YYYY-MM-DD hh:mm:ss");
    if (new Date().getDay() == 0 || new Date().getDay() == 6) {
      var time = "18:00";
      const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
      const lastFriday = new Date();
      lastFriday.setDate(t);

      date = moment(lastFriday).format("YYYY-MM-DD");
      date = moment(date + " " + time);
    }

    return date;
  };
  resp.overall = {
    asOnDate: getMarketTime(),
    totalInvestment: 0,
    totalCurrentValue: 0,
    overAllPLValue: 0,
    //overAllPLPercentage : 0,
  };
  let totalInvestment = 0;
  let totalCurVal = 0;

  resp.data.map((res1) => {
    totalInvestment = totalInvestment + res1.TotalHolding * res1.BuyAvg;
    totalCurVal = totalCurVal + res1.TotalHolding * res1.CloseRate;
  });
  resp.overall.totalInvestment = totalInvestment;
  resp.overall.totalCurrentValue = totalCurVal;
  resp.overall.overAllPLValue = totalCurVal - totalInvestment;

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};
const clientListService = async (params) => {
  let newParams = params;
  let resp = await KORPAPIServices.clientListAPI({ ...params });
  let result = [];

  if (resp) {
    if (params.sort == "ascending") {
      resp.sort((a, b) =>
        a.AccountName > b.AccountName
          ? 1
          : b.AccountName > a.AccountName
          ? -1
          : 0
      );
    } else if (params.sort == "descending") {
      resp.sort((a, b) =>
        a.AccountName > b.AccountName
          ? -1
          : b.AccountName > a.AccountName
          ? 1
          : 0
      );
    }

    resp = resp.slice(params.page, params.page + params.limit);
    console.log(resp);
    for (let res of resp) {
      if (params.status == "ACTIVE") {
        if (res.AcStatus == "Active") {
          params.clientCode = res.AccountID;
          console.log("params", params);
          let profileResp = await KORPAPIServices.clientProfileAPI({
            ...params,
          });
          res.Address1 = profileResp?.MasterData[0]?.Address1 || "";
          res.Address2 = profileResp?.MasterData[0]?.Address2 || "";
          res.Address3 = profileResp?.MasterData[0]?.Address3 || "";
          res.City = profileResp?.MasterData[0]?.City || "";
          res.District = profileResp?.MasterData[0]?.District || "";
          res.PINCode = profileResp?.MasterData[0]?.PINCode || "";
          res.StateCode = profileResp?.MasterData[0]?.StateCode || "";
          res.StateName = profileResp?.MasterData[0]?.StateName || "";
          res.CountryCode = profileResp?.MasterData[0]?.CountryCode || "";

          res.DepositoryClientID = profileResp?.DPDetail[0]?.DepositoryClientID || "";

          result.push(res);
        }
      } else if (params.status == "INACTIVE") {
        if (res.AcStatus == "Inactive") {
          params.clientCode = res.AccountID;
          console.log("params", params);
          let profileResp = await KORPAPIServices.clientProfileAPI({
            ...params,
          });
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
      } else {
        params.clientCode = res.AccountID;
        console.log("params", params);
        let profileResp = await KORPAPIServices.clientProfileAPI({ ...params });
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
    data: { list: result || [], pageMeta },
  };
};


const clientListWithLedgerService = async (params) => {
  let resp = await KORPAPIServices.clientListAPI({ ...params });
  let result = [];
  if (resp) {
    console.log(resp);
    for (let res of resp) {
      if (res.AcStatus == "Active") {
        params.clientCode = res.AccountID;
        console.log("params", params);
        let profileResp = await KORPAPIServices.clientDashboardAPI({
          ...params,
        });
        res.ledgerBalance =  profileResp?.FinSummary[0]?.LedgerBalance || 0;
        if(+res.ledgerBalance > 0)
          result.push(res);
      }
    }
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: { list: result },
  };
};





const clientWithMarginShortFallService = async (params) => {
  let resp = await KORPAPIServices.clientWithMarginShortFallAPI({ ...params });

  let result = [];

  if (resp) {
    for (let res of resp.DRCRData) {
      params.clientCode = res.AccountID;
      let profileResp = await KORPAPIServices.clientProfileAPI({ ...params });
      res.MobileNo = profileResp?.MasterData[0]?.MobileNo || "";
      res.PhoneNo = profileResp?.MasterData[0]?.PhoneNo || "";
      result.push(res);
    }
  }
  result = result.filter((x) => {
    return x.NetWithMargin < 0;
  });

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};

const topPerformingClientService = async (params) => {
  let filter ={
    APId : params.apId,
    TradeDate : { $gte: `${moment().format("YYYY")}-04-01`, $lte: moment().format("YYYY-MM-DD") }
  }
  console.log('filyter',filter)
  let resp = await TurnoverBrokerageReport.find(filter);
  resp = resp.map((e)=>{
    e.TradeDate = e.TradeDate
    return e
  })
  //let resp = await KORPAPIServices.topPerformingClientAPI(params);
  // let result = [];
  // if (resp) {
  //   resp = xmlParser.toJson(resp);
  //   resp = JSON.parse(resp);
  //   result = resp.DataSet["diffgr:diffgram"]["NewDataSet"]["Table"] || [];
  //   result = convertToArray(result);
  // }

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
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
const clientPositionsService = async (params) => {
  let resp = await KORPAPIServices.clientPositionsAPI(params);
  const getMarketTime = () => {
    let date = moment().format("YYYY-MM-DD hh:mm:ss");
    if (new Date().getDay() == 0 || new Date().getDay() == 6) {
      var time = "18:00";
      const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
      const lastFriday = new Date();
      lastFriday.setDate(t);

      date = moment(lastFriday).format("YYYY-MM-DD");
      date = moment(date + " " + time);
    }

    return date;
  };
  let result = {
    overall: {
      asOnDate: getMarketTime(),
      totalInvestment: 0,
      totalCurrentValue: 0,
      overAllPLValue: 0,
      //overAllPLPercentage : 0,
    },
    data: [],
  };

  let totalInvestment = 0;
  let totalCurVal = 0;

  resp.PositionData.map((res1) => {
    result.data.push(res1);

    totalInvestment = totalInvestment + res1.BuyQuantity * res1.BuyValue;
    totalCurVal = totalCurVal + res1.BuyQuantity * res1.CloseRate;
  });
  result.overall.totalInvestment = totalInvestment;
  result.overall.totalCurrentValue = totalCurVal;
  result.overall.overAllPLValue = totalCurVal - totalInvestment;

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};

const myRevenueReportService = async (params) => {
  let FromDate =
  (params.fromDate && moment(params.fromDate).format("YYYY-MM-DD")) ||
  `${moment().format("YYYY")}-04-01`;
let ToDate =
  (params.toDate && moment(params.toDate).format("YYYY-MM-DD")) ||
  moment().format("YYYY-MM-DD");

  let all_total = 0;
  let result = [];
  let resp = {
    equity: {
      total: 0,
      list: [],
    },
    currency: {
      total: 0,
      list: [],
    },
    commodity: {
      total: 0,
      list: [],
    },
  };
  if (params.type == "equity") {
    params.Exchange = "NSE";

    let nseFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"NSE"
    }
    let nseResp = await FranchiseBrokerageReport.find(nseFilter)

    //let nseResp = await KORPAPIServices.myRevenueReportAPI({ ...params });
    params.Exchange = "BSE";
    let bseFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"BSE"
    }
    let bseResp = await FranchiseBrokerageReport.find(bseFilter)
    //let bseResp = await KORPAPIServices.myRevenueReportAPI({ ...params });
    resp.equity.list = nseResp.concat(bseResp);
    resp.equity.list.map((r) => {
      resp.equity.total = resp.equity.total + +r.IntroBrok;
    });
    delete resp.currency;
    delete resp.commodity;

    resp.equity.total = resp.equity.total.toFixed(2);
  } else if (params.type == "currency") {
    params.Exchange = "CUR";
    let curFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"CUR"
    }
    let curResp = await FranchiseBrokerageReport.find(curFilter)
    //let curResp = await KORPAPIServices.myRevenueReportAPI({ ...params });
    resp.currency.list = curResp || [];
    resp.currency.list.map((r) => {
      resp.currency.total = resp.currency.total + +r.IntroBrok;
    });
    delete resp.equity;
    delete resp.commodity;

    resp.currency.total = resp.currency.total.toFixed(2);
  } else if (params.type == "commodity") {
    params.Exchange = "ALL";
    params.Segment = "ALL";

    let comFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"ALL",
      Segment :"ALL"
    }
    let comResp = await FranchiseBrokerageReport.find(comFilter)

    //let comResp = await KORPAPIServices.myRevenueReportAPI({ ...params });
    resp.commodity.list = comResp || [];
    resp.commodity.list.map((r) => {
      resp.commodity.total = resp.commodity.total + +r.IntroBrok;
    });
    delete resp.equity;
    delete resp.currency;

    resp.commodity.total = resp.commodity.total.toFixed(2);
  } else {
    params.Exchange = "NSE";
    let nseFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"NSE"
    }
    let nseResp = await FranchiseBrokerageReport.find(nseFilter)
    params.Exchange = "BSE";
    let bseFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"BSE"
    }
    let bseResp = await FranchiseBrokerageReport.find(bseFilter)
    resp.equity.list = nseResp.concat(bseResp);
    resp.equity.list.map((r) => {
      resp.equity.total = resp.equity.total + +r.IntroBrok;
    });
    params.Exchange = "CUR";
    let curFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"CUR"
    }
    let curResp = await FranchiseBrokerageReport.find(curFilter)
    resp.currency.list = curResp || [];
    resp.currency.list.map((r) => {
      resp.currency.total = resp.currency.total + +r.IntroBrok;
    });
    params.Exchange = "ALL";
    params.Segment = "ALL";
    let comFilter ={
      APId : params.apId,
      TradeDate : { $gte: FromDate, $lte: ToDate },
      Exchange :"ALL",
      Segment :"ALL"
    }
    let comResp = await FranchiseBrokerageReport.find(comFilter)
    resp.commodity.list = comResp || [];
    resp.commodity.list.map((r) => {
      resp.commodity.total = resp.commodity.total + +r.IntroBrok;
    });
    resp.currency.total = resp.currency.total.toFixed(2);
    resp.equity.total = resp.equity.total.toFixed(2);
    resp.commodity.total = resp.commodity.total.toFixed(2);

    all_total =
      +resp.currency.total + +resp.equity.total + +resp.commodity.total;

    Object.keys(resp).map((d) => {
      let data = {
        name: capitalizeFLetter(d),
        // name: d,
        total: resp[d].total,
        list: resp[d].list || [],
      };
      result.push(data);
    });
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: { allTotal: all_total, list: result },
    };
  }

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const myReportTopClientsService = async (params) => {
  let finalResp = {
    totalTurnOver: 0,
    totalRevenue: 0,
    totalMyBrokerageRevenue: 0,
    list: [],
  };
  let topPerformingClientsObj = {};
  // let resp = await KORPAPIServices.topPerformingClientAPI({ ...params });
  // let result = [];
  // if (resp) {
  //   resp = xmlParser.toJson(resp);
  //   resp = JSON.parse(resp);
  //   result = resp.DataSet["diffgr:diffgram"]["NewDataSet"]["Table"] || [];
  //   result = convertToArray(result);
  // }


  let FromDate =
  (params.fromDate && moment(params.fromDate).format("YYYY-MM-DD")) ||
  `${moment().format("YYYY")}-04-01`;
let ToDate =
  (params.toDate && moment(params.toDate).format("YYYY-MM-DD")) ||
  moment().format("YYYY-MM-DD");

  let filter ={
    APId : params.apId,
    TradeDate : { $gte: FromDate, $lte: ToDate }
  }
  console.log(filter)
  let result = await TurnoverBrokerageReport.find(filter);


  console.log(result);
  result.map((e) => {
    if (!topPerformingClientsObj[e.AccountID]) {
      topPerformingClientsObj[e.AccountID] = {
        AccountID: e.AccountID,
        AccountName: e.AccountName,
        turnOver: +e.TotalTurnOver,
        revenue: +e.TotalBrokerage,
        myBrokerageRevenue: 0,
      };
    } else {
      topPerformingClientsObj[e.AccountID].turnOver =
        topPerformingClientsObj[e.AccountID].turnOver + +e.TotalTurnOver;
      topPerformingClientsObj[e.AccountID].revenue =
        topPerformingClientsObj[e.AccountID].revenue + +e.TotalBrokerage;
    }
  });

  let comFilter ={
    APId : params.apId,
    TradeDate : { $gte: FromDate, $lte: ToDate },
    Exchange :"NSE"
  }
  let myRevResp = await FranchiseBrokerageReport.find(comFilter)

  //let myRevResp = await KORPAPIServices.myRevenueReportAPI({ ...params });
  if (myRevResp) {
    myRevResp.map((e) => {
      if (topPerformingClientsObj[e.ClientCode]) {
        topPerformingClientsObj[e.ClientCode].myBrokerageRevenue =
          topPerformingClientsObj[e.ClientCode].myBrokerageRevenue +
          (+e.IntroBrok + +e.IntroBrok2);
      }
    });
  }
  Object.keys(topPerformingClientsObj).map((d) => {
    finalResp.totalTurnOver =
      finalResp.totalTurnOver + +topPerformingClientsObj[d].turnOver;
    finalResp.totalRevenue =
      finalResp.totalRevenue + +topPerformingClientsObj[d].revenue;
    finalResp.totalMyBrokerageRevenue =
      finalResp.totalMyBrokerageRevenue +
      +topPerformingClientsObj[d].myBrokerageRevenue;

    finalResp.list.push(topPerformingClientsObj[d]);
  });

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: finalResp,
  };
};

const myReportOverAllService = async (params) => {
  //let params = {};
  let type = params.type || "MONTH";
  if (type == "YEAR") {
    const currentDate = moment();
    let currentYear = currentDate.year();
    let financialYearStart = moment({
      year: currentYear,
      month: 3,
      day: 1,
    }).format("YYYY-MM-DD"); // April is month 3
    let financialYearEnd = moment({
      year: currentYear + 1,
      month: 2,
      day: 31,
    }).format("YYYY-MM-DD");
    params.startDate = financialYearStart;
    params.endDate = financialYearEnd;
  } else if (type == "MONTH") {
    params.startDate = moment(new Date()).startOf("month").toISOString();
    params.endDate = moment(new Date()).endOf("month").toISOString();
  } else if (type == "WEEK") {
    params.startDate = moment(new Date()).startOf("week").toISOString();
    params.endDate = moment(new Date()).endOf("week").toISOString();
  } else if (type == "QUARTER") {
    params.startDate = moment(new Date()).startOf("quarter").toISOString();
    params.endDate = moment(new Date()).endOf("quarter").toISOString();
  } else {
    type = "MONTH";
    params.startDate = moment(new Date()).startOf("month").toISOString();
    params.endDate = moment(new Date()).endOf("month").toISOString();
  }
  let result = dateList(type, params);
  var getData = async(d) => {
   // return new Promise(async (resolve, reject) => {
     
      params.fromDate = result[d].date.start;
      params.toDate = result[d].date.end;
    
      let filter ={
        APId : params.apId,
        TradeDate : { $gte: params.fromDate, $lte: params.toDate }
      }

      let comFilter ={
        APId : params.apId,
        TradeDate : { $gte: params.fromDate, $lte: params.toDate },
        Exchange :"NSE"
      }
   
    
      return await Promise.all([
        TurnoverBrokerageReport.find(filter),
        //null,
       // KORPAPIServices.myRevenueReportAPI({ ...params }),
       FranchiseBrokerageReport.find(comFilter)
      ]).then(([tempResult, myRevResp])=>{
        console.log('resp, myRevResp  ---------------------------')
        let finalResp = {
          totalTurnOver: 0,
          totalRevenue: 0,
          totalMyBrokerageRevenue: 0,
          list: [],
        };
        let topPerformingClientsObj = {};
        // let tempResult = [];
        // if (resp) {
        //   resp = xmlParser.toJson(resp);
        //   resp = JSON.parse(resp);
        //   tempResult =
        //     resp.DataSet["diffgr:diffgram"]["NewDataSet"]["Table"] || [];
        //   tempResult = convertToArray(tempResult);
        // }
  
        tempResult.map((e) => {
          if (!topPerformingClientsObj[e.AccountID]) {
            topPerformingClientsObj[e.AccountID] = {
              AccountID: e.AccountID,
              AccountName: e.AccountName,
              turnOver: +e.TotalTurnOver,
              revenue: +e.TotalBrokerage,
              myBrokerageRevenue: 0,
            };
          } else {
            topPerformingClientsObj[e.AccountID].turnOver =
              topPerformingClientsObj[e.AccountID].turnOver + +e.TotalTurnOver;
            topPerformingClientsObj[e.AccountID].revenue =
              topPerformingClientsObj[e.AccountID].revenue + +e.TotalBrokerage;
          }
        });
        //  let myRevResp =  await KORPAPIServices.myRevenueReportAPI({...params});
        if (myRevResp) {
          console.log("myRevResp ---", myRevResp);
          myRevResp.map((e) => {
            if (topPerformingClientsObj[e.ClientCode]) {
              topPerformingClientsObj[e.ClientCode].myBrokerageRevenue =
                topPerformingClientsObj[e.ClientCode].myBrokerageRevenue +
                (+e.IntroBrok + +e.IntroBrok);
            }
          });
        }
        Object.keys(topPerformingClientsObj).map((data1) => {
          finalResp.totalTurnOver =
            finalResp.totalTurnOver + +topPerformingClientsObj[data1].turnOver;
          finalResp.totalRevenue =
            finalResp.totalRevenue + +topPerformingClientsObj[data1].revenue;
          finalResp.totalMyBrokerageRevenue =
            finalResp.totalMyBrokerageRevenue +
            +topPerformingClientsObj[data1].myBrokerageRevenue;
  
          // finalResp.list.push(topPerformingClientsObj[d])
        });
        result[d].resp.totalTurnOver = finalResp.totalTurnOver || 0;
        result[d].resp.totalRevenue = finalResp.totalRevenue || 0;
        result[d].resp.totalMyBrokerageRevenue =
          finalResp.totalMyBrokerageRevenue || 0;
          return true
      }).catch((e)=>{

      });

    //   let resp = await KORPAPIServices.topPerformingClientAPI({...params});
     
    // });
  };
  const keys =await Promise.all(Object.keys(result));
  await Promise.all(keys.map(getData));


  if (params.export==true ||params.export=='true' ) {
    let resp =[]
     Object.keys(result).map((key)=>{
      let obj ={
        date : result[key].text,
        totalTurnOver :(result[key].resp.totalTurnOver || 0).toFixed(2),
        totalRevenue : (result[key].resp.totalRevenue || 0).toFixed(2),
        totalMyBrokerageRevenue : (result[key].resp.totalMyBrokerageRevenue || 0).toFixed(2)
      }
      resp.push(obj)
    })
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp,
    };
   
  }

  let x_axis = [];
  let x_axis_value = [];
  let y_axis = [
    {
      name: "totalTurnOver",
      data: [],
    },
    {
      name: "totalRevenue",
      data: [],
    },
    {
      name: "totalMyBrokerageRevenue",
      data: [],
    },
  ];
  Object.keys(result).forEach((date) => {
    y_axis[0].data.push(result[date].resp.totalTurnOver || 0);
    y_axis[1].data.push((result[date].resp.totalRevenue || 0).toFixed(2));
    y_axis[2].data.push(
      (result[date].resp.totalMyBrokerageRevenue || 0).toFixed(2)
    );
    x_axis.push(date);
    x_axis_value.push(result[date].text);
  });
  let result1 = {
    x_axis: x_axis,
    x_axis_value: x_axis_value,
    y_axis: y_axis,
  };

  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result1,
  };
};
const clientWithdrawalRequestService = async (params) => {
  console.log(params,'params')
  let result =[]
  for(let data of params.list){
    params.clientCode = data.clientCode
    await Promise.all([
      KORPAPIServices.getApprovedWithdrawalAmountAPI({ ...params }),
      KORPAPIServices.getClientbankDetailsAPI({ ...params }),
    ]).then(async([amount, bankDetails])=>{
      console.log(amount,bankDetails)
      if(+amount >= (+data.amount) && bankDetails && bankDetails[0]?.BankAccountNumber)
      {
        params.amount = +data.amount
        params.BankAccountNumber = bankDetails[0]?.BankAccountNumber
        params.BankCode = bankDetails[0]?.BankCode
        let resps =await KORPAPIServices.clientWithdrawalRequestAPI({ ...params })
        result.push(resps)
        console.log('=------------',resps)
      }
      else
      {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_NOT_FOUND,
          message: messages?.error,
          data: [],
        };
      }
    })
  }
   return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const dashboardApStatusCountService = async (params) => {
  let result ={
    completedApCount : 0,
    rejectedApCount :0,
    inProgressApCount :0
  }
   return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};

const korpClientProfileSuperAdminTokenService = async (params) => {
  let resp = await KORPAPIServices.clientProfileAPI(params);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp,
  };
};

const validateUPIService = async (params) => {
  const upiId = params.upi ||  'sumithemmadi@paytm';

  try {
      const response = await verifyUPI(upiId);
      console.log(response)
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: response,
      };
  } catch (error) {
      console.error('Error:', error.message);
  }
  
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
  myClientsReportService,
  clientPositionsService,
  myRevenueReportService,
  myReportTopClientsService,
  myReportOverAllService,
  clientListWithLedgerService,
  clientWithdrawalRequestService,
  dashboardApStatusCountService,
  korpClientProfileSuperAdminTokenService,
  validateUPIService
};
