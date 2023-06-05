const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { CrmTicket } = require("../models/crmTicket");
const { ThirdPartyServices } = require("./../externalServices");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");
const { getCrmTicketList } = require("./list.service");
const createCrmTicketService = async (params) => {
  let token = await ThirdPartyServices.crmTicketTokenCreate();
  let payload = {
    source: "API",
    priorityscore: params.priorityScore || 1,
    customeremailid: params.priorityScore,
    subject: params.priorityScore,
    issuedescription: params.priorityScore,
    UserID: process.env.CRM_TICKET_USER_ID,
  };
  if (params.attachment) {
    payload.attachmentextension = params.attachmentextension;
    payload.attachment = await imageToBase64(params.attachment);
  }
  let apiResp = await ThirdPartyServices.crmTicketCreateNewTicket(
    token,
    payload
  );
  if (apiResp?.data[0]) {
    params.ticketId = apiResp?.data[0]?.TicketID;
    params.UserID = process.env.CRM_TICKET_USER_ID;
    params.status = "Ticket Open";
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
  if (resp) {
    let token = await ThirdPartyServices.crmTicketTokenCreate();
    let payload = {
      ticketid: resp.ticketId,
      userid: process.env.CRM_TICKET_USER_ID,
    };
    let apiResp = await ThirdPartyServices.crmTicketStatus(token, payload);
    if (apiResp?.data[0]) {
      resp.status = apiResp?.data[0].status;
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
};
const crmTicketListService = async (params) => {
  params.all = true;
  const allList = await getCrmTicketList(params);
  params.all = params.returnAll ==true ? true : false;
  var result = await getCrmTicketList(params);
  let finalResult = [];
  let token = await ThirdPartyServices.crmTicketTokenCreate();
  for (let item of result.data) {
    let resp = { ...item };
    let payload = {
      ticketid: resp.ticketId,
      userid: process.env.CRM_TICKET_USER_ID,
    };
    let apiResp = await ThirdPartyServices.crmTicketStatus(token, payload);
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
