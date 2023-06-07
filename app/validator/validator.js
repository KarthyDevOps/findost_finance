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

const createCrmTicketValidation = (req, res, next) => {
  const schema = joi.object({
    source: joi.string().required(),
    priorityScore: joi.string().required(),
    customerEmailId: joi.string().required(),
    subject: joi.string().required(),
    description: joi.string().required(),
    status: joi.string().required(),
    attachmentExtension: joi.string(),
    attachmentExtension: joi.string(),
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
    apId: joi.string().required(),
    isExistUser: joi.boolean().required(),
    userId: joi.string(),
    name: joi.string(),
    mobileNumber: joi.string(),
    emailId: joi.string(),
    aditionalInfo: joi.string(),
    productId: joi.string(),
    productName: joi.string(),
  });
  return bodyParamValidation(req, res, next, schema);

};
module.exports = {
  bodyParamValidation,
  queryParamValidation,
  crmTicketListValidation,
  createCrmTicketValidation,
  getCrmTicketeValidation,
  leadCreateValidation
};
