const joi = require("joi");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { joierrors } = require("../response/response");
const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

const bodyParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.body, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    next();
  }
};

const queryParamValidation = (req, res, next, schama) => {
  let schema = schama;
  let option = options.basic;
  var { error, value } = schema.validate(req.query, option);
  if (error && Object.keys(error).length > 0) {
    joierrors(
      req,
      res,
      statusCodes.HTTP_BAD_REQUEST,
      statusMessage[400],
      error
    );
  } else {
    if (req?.bodyParam) return;
    else next();
  }
};


const crmTicketListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};


const leadListValidation = (req, res, next) => {
  const schema = joi.object({
    search: joi.allow(null).allow(""),
    isActive: joi.allow(null).allow(""),
    limit: joi.number(),
    page: joi.number(),
  });
  return queryParamValidation(req, res, next, schema);
};


const createCrmTicketValidation = (req, res, next) => {
  const schema = joi.object({
    source: joi.string().required(),
    priorityScore: joi.string().required(),
    customerEmailId: joi.string().required(),
    subject: joi.string().required(),
    description: joi.string().required(),
    // status: joi.string().required(),
    // attachmentExtension: joi.string(),
    // attachmentExtension: joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const getCrmTicketeValidation = (req, res, next) => {
  const querySchema = joi.object({
    id: joi.string().allow(null).allow(""),
  });
  req.bodyParam = false;
  queryParamValidation(req, res, next, querySchema);
};

const leadCreateValidation = (req, res, next) => {
  const schema = joi.object({
    isExistUser: joi.boolean().required(),
    userId: joi.string(),
    name: joi.string(),
    mobileNumber: joi.string(),
    emailId: joi.string(),
    aditionalInfo: joi.string(),
    productId: joi.string(),
    productName: joi.string(),
    clientDetails: joi.object({
      clientName: joi.string().required(),
      clientCode: joi.allow(null).allow(""),
      clientPhoneNumber: joi.string().required(),
      clientEmail: joi.string().required()
    })
  });
  return bodyParamValidation(req, res, next, schema);
};

const createWatchListValidation = (req, res, next) => {
  const schema = joi.object({
    schemeCode: joi.string().required(),
    schemeName: joi.string().required(),
    categoryCode: joi.string().required(),
    categoryName: joi.string().required(),
    one_MONTHRET: joi.allow(null).allow(""),
    three_MONTHRET: joi.allow(null).allow(""),
    six_MONTHRET: joi.allow(null).allow(""),
    one_YRRET: joi.allow(null).allow(""),
    three_YEARRET: joi.allow(null).allow(""),
    five_YEARRET:joi.allow(null).allow(""),
    INCRET: joi.allow(null).allow(""),
  });
  return bodyParamValidation(req, res, next, schema);
};

const createProductIpoValidation = (req, res, next) => {
  const schema = joi.object({
    ipoName: joi.string().required(),
    clientName: joi.string().required(),
    clientCode: joi.string().required(),
    clientNumber: joi.string().required(),
    appNo: joi.string().required(),
    upiID: joi.string().required(),
    upiApprovalStatus: joi.string().required(),
    bidDetails: joi.array().required(),
    ipoTimeLine: joi.array().required(),
    numberOfLots: joi.string().required(),
    lotsApplied: joi.string().required(),
    amount: joi.string().required(),
    currentStatus: joi.string().required(),
  });
  return bodyParamValidation(req, res, next, schema);
};

const deleteProductIpoValidation = (req, res, next) => {
  const querySchema = joi.object({
    id: joi.string().required()
  });
  req.bodyParam = true;
  queryParamValidation(req, res, next, querySchema);

  const schema = joi.object({
    cancelReason: joi.string().required()
  });
  return bodyParamValidation(req, res, next, schema);
};

module.exports = {
  bodyParamValidation,
  queryParamValidation,
  crmTicketListValidation,
  createCrmTicketValidation,
  getCrmTicketeValidation,
  leadCreateValidation,
  createWatchListValidation,
  createProductIpoValidation,
  deleteProductIpoValidation,
  leadListValidation
};
