const FormData = require("form-data");
let { InternalAPIs } = require("../configs");
let { Rest } = require("../restCalls");

const sendEmail = async (data) => {
  try {
    console.log("The following is the data", data);
    let urlPayload = JSON.parse(JSON.stringify(InternalAPIs.sendEmail));
    console.log('urlPayload', urlPayload)
    urlPayload.data = data;
    let response = await Rest.callApi(urlPayload);
    console.log("The following is the response", response);
    return response.data;
  } catch (err) {
    console.log(">>>>>>", err);
    throw new Error(err);
  }
};
const getUserById = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getUserById));
  apiConfig.url = process.env.USER_URL + process.env.GET_USER_BY_ID+data._id;
  apiConfig.data = data;
  return await Rest.callApi(apiConfig);
};


const getAPById = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getAPById));
  apiConfig.url = process.env.USER_URL + process.env.GET_AP_BY_ID+data._id;
  apiConfig.data = data;
  return await Rest.callApi(apiConfig);
};

const getSequenceId = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getSequenceId));
  apiConfig.url = process.env.USER_URL + process.env.GET_SEQUENCE_ID;
  apiConfig.data = data;
  console.log('apiConfig',apiConfig)
  return await Rest.callApi(apiConfig);
};

const postLeadCreationNotification = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.AddLeadNotification));
  apiConfig.url = process.env.COMMUNICATION_URL + process.env.ADMIN_NOTIFICATION;
  apiConfig.data = data;
  console.log('apiConfig',apiConfig)
  return await Rest.callApi(apiConfig);
};

const getBOUSERSById = async (data) => {
  let apiConfig = JSON.parse(JSON.stringify(InternalAPIs.getAPById));
  apiConfig.url = process.env.USER_URL + process.env.GET_BO_USERS_BY_ID + data;
  apiConfig.data = data;
  console.log("apiConfig", apiConfig);
  return await Rest.callApi(apiConfig);
};

module.exports = {
  getUserById,
  getAPById,
  getSequenceId,
  postLeadCreationNotification,
  getBOUSERSById,
  sendEmail
};
