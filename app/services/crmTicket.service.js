const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { CrmTicket } = require("../models/crmTicket");
const { ThirdPartyServices ,CRMTicketAPIServices} = require("./../externalServices");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");
const { getCrmTicketList } = require("./list.service");
const createCrmTicketService = async (params) => {
  console.log(params,'params')
  let token = params.token
  let payload ={
      "source": params.source || "API",
      "priorityscore": params.priorityscore || "1" ,
      "customeremailid": params.customerEmailId,
      "subject":  params.subject,
      "issuedescription": params.issuedescription || "I have been facing issue while logging into the system",
      "UserID":  process.env.CRM_TICKET_USER_ID
    }

  let apiResp = await CRMTicketAPIServices.createTicketAPI(token,payload)
  console.log(apiResp["code"] ,'apiResp')
  apiResp = apiResp
      .replace('"[', '[')
      .replace(']"', ']')
  apiResp = JSON.parse(apiResp)
  if (apiResp && apiResp.code == "200") {
    console.log(apiResp?.data)
    params.ticketId = apiResp?.data[0]?.TicketID;
    params.APId = params.userId;
    params.userId = process.env.CRM_TICKET_USER_ID;
    params.APName =  params.userName;
    params.status = "New";
    var newvalues = params;
    const resp = await CrmTicket.create(newvalues);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: {
        _id: resp?._id,
      },
    };
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.error,
    };
  }
};
const getCrmTicketService = async (params) => {
  var payload = {
    _id: params?.crmTicketId,
    isDeleted: false,
  };
  var resp = await CrmTicket.findOne(payload);
  console.log('resp',resp)
  if (resp) {
    let token = params.token;
    let payload = {
      ticketid: resp.ticketId,
      userid: resp.userId,
    };
    let apiResp = await CRMTicketAPIServices.ticketStatusAPI(token, payload);
    apiResp = apiResp
      .replace('"[', '[')
      .replace(']"', ']')
      apiResp = JSON.parse(apiResp)
      console.log('apiResp',apiResp)
    if (apiResp?.data[0]) {
      resp.status = apiResp?.data[0].Status;
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: resp,
      };
    } else {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
        message: messages?.error,
      };
    }
  }
  else
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: '',
    };
  }
};
const crmTicketListService = async (params) => {
  params.all = true;
  const allList = await getCrmTicketList(params);
  params.all = params.returnAll ==true ? true : false;
  var result = await getCrmTicketList(params);
  let finalResult = [];
  let token = params.token;
  for (let item of result.data) {
    let resp = { ...item };
    let payload = {
      ticketid: resp.ticketId,
      userid: resp.userId,
    };
    console.log('apiResp',token)
    let apiResp = await CRMTicketAPIServices.ticketStatusAPI(token, payload);
    apiResp = apiResp
        .replace('"[', '[')
        .replace(']"', ']') 
    apiResp = JSON.parse(apiResp)
    if (apiResp?.data[0]) {
      resp.status = apiResp?.data[0].status;
    }
    finalResult.push(resp);
  }
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: finalResult, pageMeta },
  };
};

const crmTicketUpdateStatusService = async () => {
  
    var resp = await CrmTicket.find({});
    if (resp) {
        let token = await ThirdPartyServices.crmTicketTokenCreate();
        for (let item of resp) {
            let resp = { ...item };
            let payload = {
              ticketid: resp.ticketId,
              userid: process.env.CRM_TICKET_USER_ID,
            };
            let apiResp = await ThirdPartyServices.crmTicketStatus(token, payload);
            if (apiResp?.data[0]) {
              let status = apiResp?.data[0].status;
              let data = await category.findOneAndUpdate({ticketId: resp.ticketId}, { $set: {status : status} }, { new: true });
            }
          }
    }
  };
module.exports = {
  createCrmTicketService,
  getCrmTicketService,
  crmTicketListService,
  crmTicketUpdateStatusService
};
