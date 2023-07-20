// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyToken,korpAuthentication,CRMTicketAuthentication } = require("../middlewares/authentication");
const {
  crmTicketListValidation,
  createCrmTicketValidation,
  getCrmTicketeValidation,

  leadCreateValidation
} = require("../validator/validator");

const {
  createCrmTicket,
  crmTicketList,
  getCrmTicket
} = require("../controllers/crmTicketManagement.controller");

const {
  createLeads
} = require("../controllers/leads.controller");

const {
  createWatchList,
  getWatchList,
  updateWatchList,
  watchListList,
} = require("../controllers/watchList.controller");


const {
  categoryList,
  categoryReturnsList,
  schemesList,
  getSchemesFilteredList,
  getSchemeNAVDetails,
  getMFSnapshotDetails,
  getSystematicInvestmentpattern,
  allHoldings,
  getFundFactsheet,
  ipoIssue,
  ipoNewListing,
  ipoSnapshot,
  nfoUpdates,
  getCorporateNews,
  getEconomyNews
} = require("../controllers/accordFintech.controller");
const {
  authentication,
  clientProfile,
  clientDashboard,
  clientMaster
} = require("../controllers/korp.controller");



const { errHandle } = require("../helpers/index");

const router = Router();
//Ticket Management
router.get(
  routes.v1.CRMTicketManagenent.list,
  [CRMTicketAuthentication, crmTicketListValidation],
  errHandle(crmTicketList)
);
router.post(
  routes.v1.CRMTicketManagenent.create,
  [verifyToken("AP"),CRMTicketAuthentication, createCrmTicketValidation],
  errHandle(createCrmTicket)
);
router.get(
  routes.v1.CRMTicketManagenent.get,
  [CRMTicketAuthentication,getCrmTicketeValidation,],
  errHandle(getCrmTicket)
);

router.get(
  routes.v1.Leads.create,
  [verifyToken("AP"), leadCreateValidation],
  errHandle(createLeads)
);


//ACCORD FINTECH Management
router.get(
  routes.v1.ACCORD_FINTECH.MF.CATEGORY_LIST,
  [verifyToken("AP")],
  errHandle(categoryList)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.CATEGORY_RETURNS,
  [verifyToken("AP")],
  errHandle(categoryReturnsList)
);


router.get(
  routes.v1.ACCORD_FINTECH.MF.SCHEME_LIST,
  [verifyToken("AP")],
  errHandle(schemesList)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.GET_SCHEME_FILTERED_LIST,
  [verifyToken("AP")],
  errHandle(getSchemesFilteredList)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.GET_SCHEME_NAV_DETAILS,
  [verifyToken("AP")],
  errHandle(getSchemeNAVDetails)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.MF_SNAPSHOT_SUMMARY,
  [verifyToken("AP")],
  errHandle(getMFSnapshotDetails)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.SYSTEMATIC_INVESTMENT_PATTERN,
  [verifyToken("AP")],
  errHandle(getSystematicInvestmentpattern)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.ALL_HOLDINGS,
  [verifyToken("AP")],
  errHandle(allHoldings)
);

router.get(
  routes.v1.ACCORD_FINTECH.MF.NFO_UPDATES,
  [verifyToken("AP")],
  errHandle(nfoUpdates)
);

router.get(
  routes.v1.ACCORD_FINTECH.IPO.IPO_ISSUE,
  [verifyToken("AP")],
  errHandle(ipoIssue)
);

router.get(
  routes.v1.ACCORD_FINTECH.IPO.IPO_NEW_LISTING,
  [verifyToken("AP")],
  errHandle(ipoNewListing)
);


router.get(
  routes.v1.ACCORD_FINTECH.IPO.IPO_SNAPSHOT,
  [verifyToken("AP")],
  errHandle(ipoSnapshot)
);

router.get(
  routes.v1.ACCORD_FINTECH.MF.GET_FUND_FACT_SHEET,
  [verifyToken("AP")],
  errHandle(getFundFactsheet)
);

router.get(
  routes.v1.ACCORD_FINTECH.NEWS.CORPORATE_NEWS,
  [verifyToken("AP")],
  errHandle(getCorporateNews)
);

router.get(
  routes.v1.ACCORD_FINTECH.NEWS.ECONOMY_NEWS,
  [verifyToken("AP")],
  errHandle(getEconomyNews)
);

//KORP Management

router.get(
  routes.v1.KORP.AUTHENTICATION,
  [korpAuthentication],
  errHandle(authentication)
);
router.get(
  routes.v1.KORP.CLIENT_PROFILE,
  [korpAuthentication],
  errHandle(clientProfile)
);
router.get(
  routes.v1.KORP.CLIENT_DASHBOARD,
  [korpAuthentication],
  errHandle(clientDashboard)
);
router.get(
  routes.v1.KORP.CLIENT_MASTER,
  [korpAuthentication],
  errHandle(clientMaster)
);





//WATCHLIST Management

router.get(
  routes.v1.WATCH_LIST.ADD,
  [verifyToken("AP")],
  errHandle(createWatchList)
);
router.get(
  routes.v1.WATCH_LIST.LIST,
  [verifyToken("AP")],
  errHandle(watchListList)
);
router.get(
  routes.v1.WATCH_LIST.GET,
  [verifyToken("AP")],
  errHandle(getWatchList)
);
router.get(
  routes.v1.WATCH_LIST.UPDATE,
  [verifyToken("AP")],
  errHandle(updateWatchList)
);

module.exports = router;
