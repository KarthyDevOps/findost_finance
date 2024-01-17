const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { IPOAPIServices } = require("../externalServices");
const { cmsIpoDates } = require("../models/cmsIpoDates");
const { ipoApplicationNo } = require("../models/ipoApplicationNo");
const { IPO } = require("../models/ipo");
const moment = require("moment");
const {sendEmail} = require("../apiServices/internalServices");


const { pageMetaService } = require("../helpers/index");
const { getMaxListeners } = require("process");
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
  let cmsIpoDatesResp = await cmsIpoDates.find({ isDeleted: false }).lean();
  let obj ={}
  cmsIpoDatesResp.map((data) => {
    obj[data.symbol] = data
  })
  if (resp && resp.status == "success") {
    resp.transactions = resp.transactions.map((e)=>{
      if(obj[e.symbol])
      {
        e = {...obj[e.symbol],...e}
      }
      return e
    })
    if(params.rejectApplication ==true ||  params.rejectApplication =='true')
    {
      resp.transactions = resp.transactions.filter((e)=>e.status !="success")
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp,
    };
  } else {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
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
      ipoDocType : params.ipoDocType,
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
  console.log('isUsedISINnoObj----',isUsedISINnoObj)
  resp = JSON.parse(JSON.stringify(resp));
  result = resp.map((data) => {
    data.balanceApplicationNoCount = 0;
    if (
      new Date().getTime() > new Date(moment(data.biddingStartDate,'DD-MM-YYYY').startOf('day')).getTime() && new Date().getTime() <= new Date(moment(data.biddingEndDate,'DD-MM-YYYY').endOf('day')).getTime()
    ) {
      data.status = "OPEN";
    }
    else if(new Date().getTime() >= new Date(moment(data.biddingEndDate,'DD-MM-YYYY').endOf('day')).getTime()) {
      data.status = "CLOSED";
    } 
    else if(new Date().getTime() < new Date(moment(data.biddingStartDate,'DD-MM-YYYY').startOf('day')).getTime()) {
      data.status = "UPCOMMING";
    }
    if (data.applicationNo && data.applicationNo.length > 0) {
      let total = 0;
      data.applicationNo.map((d1) => {
        total = total + (+d1.to - +d1.from);
      });
      if (isUsedISINnoObj[data.ipoisinNumber]) {
        data.balanceApplicationNoCount =
          (+total - +isUsedISINnoObj[data.ipoisinNumber].length)  + 1;
      } else {
        data.balanceApplicationNoCount = total + 1;
      }
    }
    return { ...data };
  });
  if(params.status)
  {
    result = result.filter((data) => data.status ==params.status)
  }
  
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: result,
  };
};
const buyIPOService = async (params) => {
  let applicationNumber = null;
  let cmsIpoDatesResp = await cmsIpoDates
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
    isUsedISINnoObj[data.ipoisinNumber].push(+data.applicationNo);
  });
  function findNextNumber(applicationNo, usedNumbers) {
    let nextNumber = null;
    for (let i = 0; i < applicationNo.length; i++) {
      for (let num = applicationNo[i].from; num <= applicationNo[i].to; num++) {
        if (!usedNumbers.includes(num)) {
          nextNumber = num;
          break;
        }
      }
      if (nextNumber !== null) {
        break;
      }
    }
    return nextNumber;
  }
  if (cmsIpoDatesResp) {
    if (
      cmsIpoDatesResp.applicationNo &&
      cmsIpoDatesResp.applicationNo.length > 0
    ) {
      let balanceApplicationNoCount = 0;
      let total = 0;
      cmsIpoDatesResp.applicationNo.map((d1) => {
        total = total + (+d1.to - +d1.from);
      });
      if (isUsedISINnoObj[cmsIpoDatesResp.ipoisinNumber]) {
        balanceApplicationNoCount =
          +total - +isUsedISINnoObj[cmsIpoDatesResp.ipoisinNumber].lenght;
      } else {
        balanceApplicationNoCount = total;
      }
      if (isUsedISINnoObj[cmsIpoDatesResp.ipoisinNumber]) {
        if (
          cmsIpoDatesResp.applicationNo &&
          cmsIpoDatesResp.applicationNo.length > 0
        ) {
          applicationNumber = findNextNumber(
            cmsIpoDatesResp.applicationNo,
            isUsedISINnoObj[cmsIpoDatesResp.ipoisinNumber]
          );
        }
      } else {
        applicationNumber = cmsIpoDatesResp.applicationNo[0].from;
      }
      if (!applicationNumber) {
        return {
          status: false,
          statusCode: statusCodes?.HTTP_NOT_FOUND,
          message: "Application No Not Available please contact Admin...",
          data: [],
        };
      }
      params.applicationNumber = applicationNumber;
      let payload = {
        symbol: params.symbol ,
        applicationNumber: params.oldApplicationNumber || params.applicationNumber ,
        category: params.category || "IND", // individual - retail, HNI (via its own PAN)
        clientName: params.clientName ,
        depository: params.depository || "NSDL" ,
        dpId: params.dpId || "IN304088", // NSDL = IN304088 or CDSL = 12081601, dematID - IN30408810009261
        clientBenId: params.clientBenId , // client holder id
        nonASBA: false, // false – ASBA (default)
        pan: params.pan ,
        referenceNumber: "MYREF0001", // NON-MANDATORY for UPI bid
        allotmentMode: "demat",
        upiFlag: "Y",
        upi: params.upi , // client master at edelwiess available, look into it
        bankCode: null, //
        locationCode: null, //
        timestamp: moment().format("DD-MM-YYYY HH:MM:SSS"),
        subBrokerCode: params.APId , // important to include
        bids: [
          {
            activityType: "new",
            quantity: params.quantity , // > min qty
            atCutOff: params.atCutOff ,
            remark: params.APId,
          },
        ],
      };
      if (params.atCutOff == false) {
        payload.bids[0].price = params.price;
        payload.bids[0].amount = params.amount;
      }

      if(params.activityType == "cancel")
      {
        payload.bids[0].activityType = 'cancel',
        payload.bids[0].bidReferenceNumber = params.bidReferenceNumber
      }
      console.log('payload---',payload)
      let resp = await IPOAPIServices.buyIPOAPI(params.token, payload);
      console.log('22resp' ,resp)
      if (resp) {
        if (resp.status == "success") {
          await IPO.create(resp);
          let ipoApplicationNocreateResp = await ipoApplicationNo.create({
            ipoisinNumber: params.ipoisinNumber,
            applicationNo: applicationNumber,
            clientCode: params.clientCode || "17HS",
            apId: params.APId,
          });
          if (balanceApplicationNoCount < 100) {
            // send mail alert
            sendEmail({
              to : process.env.IPO_APPLICATION_COUNT_ALERT_MAIL,
              subject: "Login Credentials",
              template: "forgot_password",
              count:balanceApplicationNoCount,
              name : cmsIpoDatesResp.name
            })
          }
          return {
            status: false,
            statusCode: statusCodes?.HTTP_OK,
            message: "IPO added Successfully...",
            data: resp,
          };
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
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_NOT_FOUND,
        message: "Application No Not Available please contact Admin...",
        data: [],
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
};
module.exports = {
  ipoLoginService,
  ipoTransactionAddService,
  ipoTransactionListService,
  ipoMasterService,
  cmsIpoUpdateService,
  buyIPOService,
};
