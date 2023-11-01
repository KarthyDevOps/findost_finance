const jwt = require("jsonwebtoken");
const { InternalServices } = require("./../apiServices");
const { KORPAPIServices,CRMTicketAPIServices,BSESTARAPIServices } = require("./../externalServices");

const { sendErrorResponse } = require("../response/response");
const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const verifyToken = (type = ["ADMIN"]) =>
  async function (req, res, next) {
    try {
      if (
        req.headers["x-access-token"] ||
        req.headers["authorization"] ||
        req.headers["Authorization"]
      ) {
        let token =
          req.headers["x-access-token"] ||
          req.headers["authorization"] ||
          req.headers["Authorization"];
        token = token.replace("Bearer ", "");
        let decode, user;
        var userData = null;
        let userType = null;
        try {
          decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
          userData = await InternalServices.getUserById({ _id: decode?._id });
          userType = "ADMIN";
        } catch (error) {
          if (type.includes("AP")) {
            let id;
            decode = jwt.verify(token, process.env.JWT_authorizedPerson_SECRET);
            if (decode) {
              id = decode?.APId || decode?._id;
            }

            userData = await InternalServices.getBOUSERSById({token:id});
            userData ={
              data :{
                korpAccessToken:token,
                isActive:true,
                ...userData
              }
            }
            userData.data.apId = userData?.data?.BOUserId
            userType = "AP";
          }
        }
        if (userData?.data) {
          if (!userData?.data.isActive) {
            return sendErrorResponse(
              req,
              res,
              statusCodes.HTTP_UNAUTHORIZED,
              messages.adminInActive,
              []
            );
          } else {
            req.user = userData?.data;
            req.user.userType = userType;
            next();
          }
        } else {
          return sendErrorResponse(
            req,
            res,
            statusCodes.HTTP_UNAUTHORIZED,
            messages.tokenInvalid,
            []
          );
        }
      } else {
        return sendErrorResponse(
          req,
          res,
          statusCodes.HTTP_UNAUTHORIZED,
          messages.tokenEmpty,
          []
        );
      }
    } catch (error) {
      console.log(error);
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.tokenInvalid,
        []
      );
    }
  };
const verifyAdminRole = (roles, action) =>
  async function (req, res, next) {
    let isPermissionDenied = true;
    if (req.user && req.user.permissions) {
      if (req.user.permissions[roles]) {
        if (
          req.user.permissions[roles].indexOf(action.toString()) ||
          req.user.permissions[roles].indexOf("ALL")
        ) {
          isPermissionDenied = false;
        }
      }
    }
    if (req.user.userType == "AP") {
      isPermissionDenied = false;
    }
    if (isPermissionDenied) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.accessDenied,
        []
      );
    } else {
      next();
    }
  };
  const korpAuthentication = async(req, res, next) =>{
    console.log('wwww')
    let resp = await KORPAPIServices.authenticationAPI();
    if(resp?.access_token)
    {
      if(!req.user) req.user = {}
      req.user.korpAccessToken = resp?.access_token
      next()
    }
    else{
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.accessDenied,
        []
      );
    }
  };
  const CRMTicketAuthentication = async(req, res, next) =>{
    let resp = await CRMTicketAPIServices.CRMTicketAuthenticationAPI();
    if(resp)
    {
      if(!req.user) req.user = {}
      req.user.CRMAccessToken = resp
      next()
    }
    else{
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.accessDenied,
        []
      );
    }
  };
  
  const BSEStarAuthentication = async(req, res, next) =>{
    let resp = await BSESTARAPIServices.bseStarauthenticationAPI();
    console.log('resp',resp)
    if(resp)
    {
      if(!req.user) req.user = {}
      req.user.CRMAccessToken = resp
      next()
    }
    else{
      return sendErrorResponse(
        req,
        res,
        statusCodes.HTTP_UNAUTHORIZED,
        messages.accessDenied,
        []
      );
    }
  };
module.exports = {
  verifyToken,
  verifyAdminRole,
  korpAuthentication,
  CRMTicketAuthentication,
  BSEStarAuthentication
};
