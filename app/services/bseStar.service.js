const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { BSESTARAPIServices } = require("../externalServices");
const moment = require("moment");

const { bseStarSequence } = require("../models/bseStarSequence");
const { mutualFund } = require("../models/mutualFund");

const bseStarAuthenticationService = async (params) => {
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: {
      token: params.token,
    },
  };
};

const bseStarSipCreateService = async (params) => {
  params.MemberId = process.env.BSE_STAR_MEMBERID;
  params.UserID = process.env.BSE_STAR_USERID;
  params.PassKey = process.env.BSE_STAR_PASSKEY;
  let memberId = process.env.BSE_STAR_MEMBERID;
  params.sequenceNumber = null;
  let isSequenceExist = await bseStarSequence
    .findOne({ date: moment().format("YYYY-MM-DD") })
    .lean();
  if (isSequenceExist) {
    let sequence = isSequenceExist.sequenceNumber
      .toString()
      .padStart(6, "0")
      .toString();
    params.sequenceNumber = `${moment().format(
      "YYYYMMDD"
    )}${memberId}${sequence}`;
    var newvalues = {
      $set: {
        sequenceNumber: isSequenceExist.sequenceNumber +1,
      },
    };
    console.log('newvalues---',newvalues)
    let r = await bseStarSequence.updateOne({ date: moment().format("YYYY-MM-DD") }, newvalues);
    console.log(r,'r----------------------')
  } else {
    await bseStarSequence
      .create({ date: moment().format("YYYY-MM-DD"), sequenceNumber: 1 });
    let sequence = "1".padStart(6, "0").toString();
    params.sequenceNumber = `${moment().format(
      "YYYYMMDD"
    )}${memberId}${sequence}`;
  }
  let resp = await BSESTARAPIServices.bseStarSipCreateAPI(params);
  if (resp?.sipOrderEntryParamResponse?.sipOrderEntryParamResult) {
    let orderResp =updateResp= resp?.sipOrderEntryParamResponse?.sipOrderEntryParamResult;
    
    isSuccess = true;
    if (orderResp.includes("FAILED")) {
      isSuccess = false;
      orderResp = orderResp.split("|");
    }
    if (isSuccess) {
      let mutualFundPayload = {
        transactionNo: params.sequenceNumber,
        investmentType: 'SIP',
        APId: params.APId,
        APName: params.APName,
        clientName: params.clientName,
        clientCode: params.clientCode,
        schemeCode: params.schemeCode,

        SIPAmount: params.SIPAmount,
        SIPFrequency: params.SIPFrequency,
        dayOfInvestment: params.dayOfInvestment,
        numberOfInstallments: params.numberOfInstallments,
        paymentMode: params.paymentMode,
        thirdPartyResp: updateResp,
      };
      console.log('mutualFundPayload---',mutualFundPayload)
      mutualFund.create(mutualFundPayload);
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.MFCreatedSuccessfully,
        data: [],
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_NOT_FOUND,
        message: orderResp[orderResp.length - 3],
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
const bseStarLumpsumCreateService = async (params) => {
  params.MemberId = process.env.BSE_STAR_MEMBERID;
  params.UserID = process.env.BSE_STAR_USERID;
  params.PassKey = process.env.BSE_STAR_PASSKEY;
  let memberId = process.env.BSE_STAR_MEMBERID;
  params.sequenceNumber = null;
  let isSequenceExist = await bseStarSequence
    .findOne({ date: moment().format("YYYY-MM-DD") })
    .lean();

    console.log('isSequenceExist',isSequenceExist)
  if (isSequenceExist) {
    let sequence = isSequenceExist.sequenceNumber
      .toString()
      .padStart(6, "0")
      .toString();
    params.sequenceNumber = `${moment().format(
      "YYYYMMDD"
    )}${memberId}${sequence}`;
    var newvalues = {
      $set: {
        sequenceNumber: isSequenceExist.sequenceNumber +1,
      },
    };
    console.log('newvalues---',newvalues)
    let r = await bseStarSequence.updateOne({ date: moment().format("YYYY-MM-DD") }, newvalues);
    console.log(r,'r----------------------')
  } else {
    await bseStarSequence
      .create({ date: moment().format("YYYY-MM-DD"), sequenceNumber: 1 });
    let sequence = "1".padStart(6, "0").toString();
    params.sequenceNumber = `${moment().format(
      "YYYYMMDD"
    )}${memberId}${sequence}`;
  }
  let resp = await BSESTARAPIServices.bseStarLumpsumCreateAPI(params);
  if (resp?.orderEntryParamResponse?.orderEntryParamResult) {
    let orderResp =updateResp= resp?.orderEntryParamResponse?.orderEntryParamResult;
    orderResp = orderResp.split("|");
    isSuccess = true;
    if (orderResp[orderResp.length - 1] == (1 || "1")) {
      isSuccess = false;
    }
    if (isSuccess) {
      let mutualFundPayload = {
        transactionNo: params.sequenceNumber,
        investmentType: 'LUMPSUM',
        APId: params.APId,
        APName: params.APName,
        clientName: params.clientName,
        clientCode: params.clientCode,
        schemeCode: params.schemeCode,
        lumpsumAmount: params.orderVal,
        thirdPartyResp: updateResp,
      };
      console.log('mutualFundPayload---',mutualFundPayload)
      mutualFund.create(mutualFundPayload);
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.MFCreatedSuccessfully,
        data: [],
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_NOT_FOUND,
        message: orderResp[orderResp.length - 2],
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
  bseStarAuthenticationService,
  bseStarSipCreateService,
  bseStarLumpsumCreateService,
};
