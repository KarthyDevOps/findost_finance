const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const { Leads } = require("../models/leads");
const {InternalServices} = require('../apiServices')
const {LEADGENERATEAPIServices} = require('../externalServices')


const {
  pageMetaService,
  imageToBase64,
} = require("../helpers/index");

const { getLeadList } = require('./list.service')

const createLeadsService = async (params) => {
  let token = params.token
  let payload =
    {
      "Name":  params.clientDetails.clientName || "Surendra",
      "Mobile": +(params.clientDetails.lientPhoneNumber || "9701547708"),
      "Email": params.clientDetails.clientEmail || "gsurendranaidu@gmail.com",
      "City": "MUMBAI",
      "UTM_Source": "API",
      "UTM_Campaign": "",
      "UTM_Medium":"",
      "URL": "",
      "Description": params.aditionalInfo || ''
      }
      console.log(token,payload)

  let apiResp = await LEADGENERATEAPIServices.createLeadAPI(token,payload)
  if(apiResp && apiResp.code== '200')
  {
    console.log('1',apiResp)
    let leadId = apiResp.data[0].LeadID
    params.APILeadId = leadId

    console.log('params',params)
     const resp = await Leads.create(params);
      let passData = {
        type:"LEAD_CREATED_NOTIFICATION",
        leadId : resp.leadId,
        extra : {
          leadId:resp.leadId
        }
      }
      await InternalServices.postLeadCreationNotification(passData)
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.created,
        data: {
          _id: resp?._id,
        },
      };
  }
  else
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_NOT_FOUND,
      message: messages?.error,
      data: []
    };
  }


 
};

const leadListService = async (params) => {
  params.all = true;
  const allList = await getLeadList(params);
  params.all = params.returnAll ==true ? true : false;

  const result = await getLeadList(params);
  const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list: result?.data, pageMeta },
  };
};


module.exports = {
  createLeadsService,
  leadListService
};
