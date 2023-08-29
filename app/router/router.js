// import { Router } from "express";
const express = require("express");
const Router = express.Router;
const { routes } = require("../routes/routes");
const { verifyToken, korpAuthentication, CRMTicketAuthentication, BSEStarAuthentication , verifyAdminRole} = require("../middlewares/authentication");
const {
  crmTicketListValidation,
  createCrmTicketValidation,
  getCrmTicketeValidation,
  leadListValidation,
  leadCreateValidation,
  createWatchListValidation,
  createProductIpoValidation,
  deleteProductIpoValidation
} = require("../validator/validator");

const {
  createCrmTicket,
  crmTicketList,
  getCrmTicket
} = require("../controllers/crmTicketManagement.controller");

const {
  createLeads, leadList
} = require("../controllers/leads.controller");

const {
  createWatchList,
  getWatchList,
  updateWatchList,
  watchListList,
} = require("../controllers/watchList.controller");


const {
  GetFundsList,
  categoryList,
  categoryReturnsList,
  schemesList,
  getSchemeWithInfo,
  GetMFNAVGraph,
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
  clientDetails,
  clientProfile,
  clientDashboard,
  clientMaster,
  clientHolding,
  clientList,
  clientWithMarginShortFall
} = require("../controllers/korp.controller");


const {
  bseStarAuthentication,
  bseStarSipCreate,
  bseStarLumpsumCreate
} = require("../controllers/bseStar.controller");

const { errHandle } = require("../helpers/index");
const { createProductIpo, updateProductIpo, getProductIpo, productIpoList, deleteProductIpo, productIpoCountList } = require("../controllers/productIpo.controller");
const { createMutualFund, updateMutualFund, getMutualFund, mutualFundList, deleteMutualFund } = require("../controllers/mutualFund.controller");
const { createAPRevenue, updateAPRevenue,getAPRevenue ,deleteAPRevenue ,APRevenueList  } = require("../controllers/authorizedPersonRevenue.controller");

const router = Router();
//Ticket Management
router.get(
  routes.v1.CRMTicketManagenent.list,
  [CRMTicketAuthentication, crmTicketListValidation],
  errHandle(crmTicketList)
);
router.post(
  routes.v1.CRMTicketManagenent.create,
  [verifyToken("AP"), CRMTicketAuthentication, createCrmTicketValidation],
  errHandle(createCrmTicket)
);
router.get(
  routes.v1.CRMTicketManagenent.get,
  [CRMTicketAuthentication, getCrmTicketeValidation,],
  errHandle(getCrmTicket)
);

router.post(
  routes.v1.Leads.create,
  [verifyToken("AP"), leadCreateValidation],
  errHandle(createLeads)
);


router.get(routes.v1.Leads.list,[verifyToken(["AP", "ADMIN"]), verifyAdminRole("leadManagement", "VIEW"), leadListValidation],errHandle(leadList));

//ACCORD FINTECH Management


router.get(
  routes.v1.ACCORD_FINTECH.MF.GET_FUNDS_LIST,
  [verifyToken("AP")],
  errHandle(GetFundsList)
);
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
  routes.v1.ACCORD_FINTECH.MF.SCHEME_LIST_WITH_INFO,
  [verifyToken("AP")],
  errHandle(getSchemeWithInfo)
);
router.get(
  routes.v1.ACCORD_FINTECH.MF.GET_MF_NAV_GRAPH,
  [verifyToken("AP")],
  errHandle(GetMFNAVGraph)
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
  routes.v1.KORP.CLIENT_LIST,
  [korpAuthentication],
  errHandle(clientList)
);

router.get(
  routes.v1.KORP.CLIENT_DETAILS_API,
  [korpAuthentication],
  errHandle(clientDetails)
);
router.get(
  routes.v1.KORP.CLIENT_HOLDINGS,
  [korpAuthentication],
  errHandle(clientHolding)
);
router.get(
  routes.v1.KORP.CLIENT_WITH_MARGIN_SHORTFALL,
  [korpAuthentication],
  errHandle(clientWithMarginShortFall)
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

router.post(
  routes.v1.WATCH_LIST.ADD,
  [verifyToken("AP"), createWatchListValidation],
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






//BSE STAR Management

router.get(
  routes.v1.BSE_STAR.AUTHENTICATION,
  [BSEStarAuthentication],
  errHandle(bseStarAuthentication)
);
router.get(
  routes.v1.BSE_STAR.SIP_CREATE,
  [verifyToken("AP")],
  errHandle(bseStarSipCreate)
);
router.get(
  routes.v1.BSE_STAR.LUMPSUM_CREATE,
  [verifyToken("AP")],
  errHandle(bseStarLumpsumCreate)
);


// Product-Ipo Mobile Module

router.post(routes.v1.PRODUCT_IPO.create, [verifyToken(["AP"]), createProductIpoValidation], errHandle(createProductIpo));
router.put(routes.v1.PRODUCT_IPO.update, [verifyToken(["AP"])], errHandle(updateProductIpo));
router.get(routes.v1.PRODUCT_IPO.get, [verifyToken(["AP"])], errHandle(getProductIpo));
router.get(routes.v1.PRODUCT_IPO.list, [verifyToken(["AP"])], errHandle(productIpoList));
router.get(routes.v1.PRODUCT_IPO.countItems, [verifyToken(["AP"])], errHandle(productIpoCountList));
//router.delete(routes.v1.PRODUCT_IPO.delete, [verifyToken(["AP"]),deleteProductIpoValidation], errHandle(deleteProductIpo)); for future use...


// Mutual- fund Ipo Mobile Module

router.post(routes.v1.MUTUAL_FUND.create, [verifyToken(["AP"])], errHandle(createMutualFund));
router.put(routes.v1.MUTUAL_FUND.update, [verifyToken(["AP"])], errHandle(updateMutualFund));
router.get(routes.v1.MUTUAL_FUND.get, [verifyToken(["AP"])], errHandle(getMutualFund));
router.get(routes.v1.MUTUAL_FUND.list, [verifyToken(["AP"])], errHandle(mutualFundList));
router.delete(routes.v1.MUTUAL_FUND.delete, [verifyToken(["AP"])], errHandle(deleteMutualFund));


// Mutual- fund Ipo Mobile Module
router.post(routes.v1.AP_REVENUE.create, [verifyToken(["AP"])], errHandle(createAPRevenue));
router.put(routes.v1.AP_REVENUE.update, [verifyToken(["AP"])], errHandle(updateAPRevenue));
router.get(routes.v1.AP_REVENUE.get, [verifyToken(["AP"])], errHandle(getAPRevenue));
router.get(routes.v1.AP_REVENUE.list, [verifyToken(["AP"])], errHandle(APRevenueList));
router.delete(routes.v1.AP_REVENUE.delete, [verifyToken(["AP"])], errHandle(deleteAPRevenue));


module.exports = router;
