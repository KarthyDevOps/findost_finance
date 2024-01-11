const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { CrmTicket } = require("../models/crmTicket");
const {
  ThirdPartyServices,
  CRMTicketAPIServices,
} = require("./../externalServices");
const {
  convert_JSON_to_file,
  formatDataList,
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");
const { getCrmTicketList } = require("./list.service");
const createCrmTicketService = async (params) => {
  console.log(params, "params");
  let token = params.token;
  let payload = {
    source: params.source || "API",
    priorityscore: params.priorityscore || "1",
    customeremailid: params.customerEmailId,
    subject: params.subject,
    issuedescription:
      params.issuedescription ||
      "I have been facing issue while logging into the system",
    UserID: process.env.CRM_TICKET_USER_ID,
  };

  let apiResp = await CRMTicketAPIServices.createTicketAPI(token, payload);
  //console.log(apiResp["code"] ,'apiResp')
  apiResp = apiResp.replace('"[', "[").replace(']"', "]");
  apiResp = JSON.parse(apiResp);
  if (apiResp && apiResp.code == "200") {
    console.log(apiResp?.data);
    params.ticketId = apiResp?.data[0]?.TicketID;
    //params.APId = params.userId;
    params.userId = process.env.CRM_TICKET_USER_ID;
    //  params.APName =  params.userName;
    params.status = "New";
    var newvalues = params;

    console.log("newvalues", newvalues);
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
  console.log("resp", resp);
  if (resp) {
    let token = params.token;
    let payload = {
      ticketid: resp.ticketId,
      userid: resp.userId,
    };
    let apiResp = await CRMTicketAPIServices.ticketStatusAPI(token, payload);
    apiResp = apiResp.replace('"[', "[").replace(']"', "]");
    apiResp = JSON.parse(apiResp);
    console.log("apiResp", apiResp);
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
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: "",
    };
  }
};
const crmTicketListService = async (params) => {
  params.all = true;
  const allList = await getCrmTicketList(params);
  params.all = params.returnAll == true ? true : false;
  var result = await getCrmTicketList(params);
  let finalResult = [];
  let token = params.token;
  for (let item of result.data) {
    let resp = { ...item };
    let payload = {
      ticketid: resp.ticketId,
      userid: resp.userId,
    };
    console.log("apiResp", token);
    let apiResp = await CRMTicketAPIServices.ticketStatusAPI(token, payload);
    apiResp = apiResp.replace('"[', "[").replace(']"', "]");
    apiResp = JSON.parse(apiResp);
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
        let data = await category.findOneAndUpdate(
          { ticketId: resp.ticketId },
          { $set: { status: status } },
          { new: true }
        );
      }
    }
  }
};

const accountOpeningDashboardListService = async (params) => {
  console.log(params, "params----------------");
  let token = params.token;

  let apiResp = await CRMTicketAPIServices.accountOpeningDashboardListAPI(token, params);
  if (apiResp && apiResp.code == "200") {
    let result =[]
    apiResp.data =[{"ekycid":10356,"Mobile":"9247120093","Email":"support@innodigital.in","Panname":"VENKATRAMAN SUDHAKAR","Clientcode":null,"AccountNumber":null},{"ekycid":10357,"Mobile":"9891725822","Email":"deepsinghjashan013@gmail.com","Panname":"JASHANDEEP SINGH","Clientcode":null,"AccountNumber":null},{"ekycid":10366,"Mobile":"9769774295","Email":"amitg27@gmail.com","Panname":"AMIT RAMESH GURMUKHANI","Clientcode":null,"AccountNumber":null},{"ekycid":20368,"Mobile":"8897184238","Email":"VISHAL@INNODIGITAL.IN","Panname":"VISHAL KUMAR PATNAMSHETTY","Clientcode":null,"AccountNumber":null},{"ekycid":20375,"Mobile":"9392682476","Email":"praveen@innodigital.in","Panname":"SETHU MADHAVA REDDY KALLAM","Clientcode":null,"AccountNumber":null},{"ekycid":20377,"Mobile":"8639532202","Email":"satyaswamy08@gmail.com","Panname":"SATYA SWAMY DURGA PRASAD VELPURI","Clientcode":null,"AccountNumber":null},{"ekycid":20380,"Mobile":"9899881466","Email":"dp1@myfindoc.com","Panname":"BHARAT SINGH PRAJAPATI","Clientcode":null,"AccountNumber":null},{"ekycid":20381,"Mobile":"9833482483","Email":"JINESHVIRA@GMAIL.COM","Panname":"BHAVANA JINESH VIRA","Clientcode":null,"AccountNumber":null},{"ekycid":20387,"Mobile":"7378796234","Email":"payal.mataghare@webengage.com","Panname":"PAYAL EKNATH MATAGHARE","Clientcode":null,"AccountNumber":null},{"ekycid":20391,"Mobile":"9885991189","Email":"krishnamraju@innodigital.in","Panname":"KOSIREDDY SAI KRISHNAMRAJU","Clientcode":null,"AccountNumber":null}]
    result = apiResp.data.map((e)=>{
      if(e.Clientcode)
      {
        e.status = "Completed"
      }
      else if(e.RejectionBankStage || e.RejectionAddressStage || e.RejectionDematStage || e.RejectionProfileStage || e.IPVRemarks || e.RejectionReason || e.ExchangeRejectionStage)
      {
        e.status = "Rejected"
      }
      else 
      {
        e.status = "Inprogress"
      }
     // e.status = params.status !="ALL" ? params.status : "Completed" // currently is dummy data
      return e
    })
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: result
    };
  } else {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
      message: messages?.error,
    };
  }
};
module.exports = {
  createCrmTicketService,
  getCrmTicketService,
  crmTicketListService,
  crmTicketUpdateStatusService,
  accountOpeningDashboardListService,
};
