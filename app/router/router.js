// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyAdminToken,verifyAdminRole,verifyAPToken } = require("../middlewares/authentication");
const {
  notificationTemplateListValidation,
  createNotificationTemplateValidation,
  getNotificationTemplateValidation,
  updateNotificationTemplateValidation,
  deleteNotificationTemplateValidation,
  
} = require("../validator/validator");

const {
  createCrmTicket,
  crmTicketList,
  getCrmTicket
} = require("../controllers/crmTicketManagement.controller");

const { errHandle } = require("../helpers/index");

const router = Router();
// //Ticket Management
// router.get(
//   routes.v1.CRMTicketManagenent.list,
//   [verifyAPToken, crmTicketListValidation],
//   errHandle(crmTicketList)
// );
// router.post(
//   routes.v1.CRMTicketManagenent.create,
//   [verifyAPToken, createCrmTicketValidation],
//   errHandle(createCrmTicket)
// );
// router.get(
//   routes.v1.CRMTicketManagenent.get,
//   [verifyAPToken, getCrmTicketeValidation],
//   errHandle(getCrmTicket)
// );

module.exports = router;
