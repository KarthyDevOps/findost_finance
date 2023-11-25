const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { IPOAPIServices } = require("../externalServices");
const { cmsIpoDates } = require("../models/cmsIpoDates");
const { ipoApplicationNo } = require("../models/ipoApplicationNo");
const { IPO } = require("../models/ipo");
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
  let resp = await IPOAPIServices.ipoTransactionListAPI(params.token);
  if(resp && resp.status=='success')
  {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp,
    };
  }
  else
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: messages?.error,
      data: [],
    };
  }
 
};
const cmsIpoUpdateService = async (params) => {
  let cmsIpoDatesList = await cmsIpoDates.findOneAndUpdate(
    { ipoisinNumber: params.ipoisinNumber },
    {
      applicationNo: params.applicationNo || [],
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
  let resp = await cmsIpoDates.find({ isDeleted: false });
  let ipoApplicationNoResp = await ipoApplicationNo
    .find({ isDeleted: false })
    .lean();
  let isUsedISINnoObj = {};
  ipoApplicationNoResp.map((data) => {
    if (!isUsedISINnoObj[data.ipoisinNumber]) {
      isUsedISINnoObj[data.ipoisinNumber] = [];
    }
    isUsedISINnoObj[data.ipoisinNumber].push(data);
  });
  resp = JSON.parse(JSON.stringify(resp));
  result = resp.map((data) => {
    data.balanceApplicationNoCount = 0;
    if (
      new Date().getTime() > new Date(moment(data.biddingStartDate)).getTime()
    ) {
      data.status = "OPEN";
    } else {
      data.status = "UPCOMMING";
    }
    if (data.applicationNo && data.applicationNo.length > 0) {
      let total = 0;
      data.applicationNo.map((d1) => {
        total = total + (+d1.to - +d1.from);
      });
      if (isUsedISINnoObj[data.ipoisinNumber]) {
        data.balanceApplicationNoCount =
          +total - +isUsedISINnoObj[data.ipoisinNumber].lenght;
      }
    }
    return { ...data };
  });
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const buyIPOService = async (params) => {
  let applicationNumber = null;
  let cmsIpoDatesResp = cmsIpoDates
    .findOne({ ipoisinNumber: params.ipoisinNumber })
    .lean();
  let ipoApplicationNoResp = await ipoApplicationNo
    .find({ isDeleted: false })
    .lean();
  let isUsedISINnoObj = {};
  ipoApplicationNoResp.map((data) => {
    if (!isUsedISINnoObj[data.ipoisinNumber]) {
      isUsedISINnoObj[data.ipoisinNumber] = [];
    }
    isUsedISINnoObj[data.ipoisinNumber].push(data.applicationNo);
  });
  function returnValue(d1) {
    for (let i = +d1.from; i <= +d1.to; i++) {
      if(isUsedISINnoObj[data.ipoisinNumber].indexOf(i) ==-1)
      {
        return i
      }
    }
    return null
  }
  if (cmsIpoDatesResp) {
    result = resp.map((data) => {
      if (isUsedISINnoObj[data.ipoisinNumber]) {
        if (data.applicationNo && data.applicationNo.length > 0) {
          let total = 0;
          data.applicationNo.map((d1) => {
            applicationNumber = returnValue(d1)
          });
        
        }
      }
    });
  }
  console.log('applicationNumber',applicationNumber)
  let payload = {
    symbol: params.symbol || "IREDA",
    applicationNumber: params.applicationNumber || "54694153",
    category: params.category || "IND", // individual - retail, HNI (via its own PAN)
    clientName: params.clientName || "Ankit Yadav",
    depository: params.depository || "NSDL",
    dpId: params.dpId || "IN304088", // NSDL = IN304088 or CDSL = 12081601, dematID - IN30408810009261
    clientBenId: params.clientBenId || "10090076", // client holder id
    nonASBA: false, // false – ASBA (default)
    pan: params.pan || "AZKPY9523B",
    referenceNumber: "MYREF0001", // NON-MANDATORY for UPI bid
    allotmentMode: "demat",
    upiFlag: "Y",
    upi: params.upi || "8630832186@paytm", // client master at edelwiess available, look into it
    bankCode: null, //
    locationCode: null, //
    timestamp: moment().format("DD-MM-YYYY HH:MM:SSS"),
    subBrokerCode: params.APId || "17HS", // important to include
    bids: [
      {
        activityType: "new",
        quantity: params.quantity || 460, // > min qty
        atCutOff: params.atCutOff || true,
        remark: params.APId,
      },
    ],
  };
  if (params.atCutOff == false) {
    payload.bids[0].price = params.price;
    payload.bids[0].amount = params.amount;
  }
  console.log("payload----", payload);
  // let resp = await IPOAPIServices.buyIPOAPI(params.token, payload);
  let resp = {
    symbol: "IREDA",
    applicationNumber: "54694149",
    clientName: "Ankit Yadav",
    chequeNumber: "",
    referenceNumber: "MYREF0001",
    dpVerStatusFlag: "P",
    subBrokerCode: "17HS",
    depository: "NSDL",
    pan: "AZKPY9523B",
    ifsc: "AHD",
    timestamp: "22-11-2023 10:42:28",
    bankAccount: "",
    bankCode: "",
    dpVerReason: "",
    dpId: "IN304088",
    upi: "8630832186@paytm",
    upiAmtBlocked: null,
    bids: [
      {
        atCutOff: true,
        amount: 14720,
        quantity: 460,
        bidReferenceNumber: 2023112201153223,
        series: "",
        price: 999999.99,
        remark: "BD/000001/testingAnkit",
        activityType: "new",
        status: "success",
      },
    ],
    allotmentMode: "demat",
    dpVerFailCode: "",
    nonASBA: false,
    upiFlag: "Y",
    category: "IND",
    locationCode: "",
    clientBenId: "10090076",
    status: "success",
  };
  if (resp) {
    if (resp.status == "success") {
      await IPO.create(resp);
      return {
        status: false,
        statusCode: statusCodes?.HTTP_NOT_FOUND,
        message: resp.reason,
        data: resp,
      };
      // update number
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_NOT_FOUND,
        message: resp.reason,
        data: resp,
      };
    }
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: messages?.error,
      data: [],
    };
  }
  console.log("resp", resp);
};
module.exports = {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
  cmsIpoUpdateService,
  buyIPOService,
};
