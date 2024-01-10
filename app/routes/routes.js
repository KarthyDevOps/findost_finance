const routes = {
  v1: {
    CRMTicketManagenent: {
      list: "/v1/CRMTicket-management/list",
      create: "/v1/CRMTicket-management/create",
      get: "/v1/CRMTicket-management/get",
      update: "/v1/CRMTicket-management/update",
      delete: "/v1/CRMTicket-management/delete",
      export: "/v1/CRMTicket-management/export",
    },
    Leads: {
      create: "/v1/leads/create",
      list: "/v1/leads/list",
    },
    WATCH_LIST: {
      ADD: "/v1/watch-list/add",
      LIST: "/v1/watch-list/list",
      GET: "/v1/watch-list/get",
      UPDATE: "/v1/watch-list/update",
    },
    ACCORD_FINTECH: {
      MF: {
        GET_FUNDS_LIST: "/v1/accord-fintech/mf/GetFunds",
        CATEGORY_LIST: "/v1/accord-fintech/mf/categoryList",
        CATEGORY_RETURNS: "/v1/accord-fintech/mf/categoryReturnsList",
        SCHEME_LIST: "/v1/accord-fintech/mf/schemeList",
        SCHEME_LIST_WITH_INFO: "/v1/accord-fintech/mf/getSchemeListWithInfo",
        GET_MF_NAV_GRAPH: "/v1/accord-fintech/mf/GetMFNAVGraph",
        GET_SCHEME_FILTERED_LIST: "/v1/accord-fintech/mf/schemeFilteredList",
        GET_SCHEME_NAV_DETAILS: "/v1/accord-fintech/mf/getSchemeNAVDetails",
        MF_SNAPSHOT_SUMMARY: "/v1/accord-fintech/mf/getMFSnapshotSummary",
        SYSTEMATIC_INVESTMENT_PATTERN: "/v1/accord-fintech/mf/getSystematicInvestmentpattern",
        ALL_HOLDINGS: "/v1/accord-fintech/mf/allHoldings",
        NFO_UPDATES: "/v1/accord-fintech/mf/nfoUpdates",
        GET_FUND_FACT_SHEET: "/v1/accord-fintech/mf/getFundFactsheet",
        
      },
      IPO: {
        IPO_ISSUE: "/v1/accord-fintech/ipo/ipoIssue",
        IPO_NEW_LISTING: "/v1/accord-fintech/ipo/ipoNewListing",
        IPO_SNAPSHOT: "/v1/accord-fintech/ipo/ipoSnapshot"
      },
      NEWS: {
        ECONOMY_NEWS: "/v1/accord-fintech/news/getEconomyNews",
        CORPORATE_NEWS: "/v1/accord-fintech/news/getCorporateNews",
      }
    },
    KORP: {
      AUTHENTICATION: "/v1/korp/authentication",
      CLIENT_PROFILE_ADMIN_TOKEN: "/v1/korp/korpClientProfileSuperAdminToken",
      CLIENT_LIST: "/v1/korp/clientList",
      CLIENT_LIST_WITH_LEDGER: "/v1/korp/clientListWithLedger",
      CLIENT_DETAILS_API : "/v1/korp/clientDetails",
      CLIENT_PROFILE: "/v1/korp/clientProfile",
      CLIENT_DASHBOARD: "/v1/korp/clientDashboard",
      CLIENT_MASTER: "/v1/korp/clientMaster",
      CLIENT_HOLDINGS : "/v1/korp/clientHoldings",
      CLIENT_POSTIONS : "/v1/korp/clientPositions",
      CLIENT_WITH_MARGIN_SHORTFALL : "/v1/korp/clientWithMarginShortFall",
      TOP_PERFORMING_CLIENT : "/v1/korp/topPerformingClient",
      MY_BROKERAGE_REVENUE : "/v1/korp/myBrokerageRevenue",
      MY_CLIENTS_REPORTS : "/v1/korp/myClientsReport",
      MY_REVENUE_REPORTS : "/v1/korp/myRevenueReport",
      MY_REPORTS_TOP_CLIENTS : "/v1/korp/myReportTopClients",
      MY_REPORTS_TOP_OVERALL : "/v1/korp/myReportOverAll",
      CLIENT_WITHDRAWAL_REQUEST : "/v1/korp/clientWithdrawalRequest",
      DASHBOARD_AP_STATUS_COUNT : "/v1/korp/dashboardApStatusCount",


      getDailyTurnOverBrokerageReportForAllAP: "/v1/korp/getDailyTurnOverBrokerageReportForAllAP",
      getDailyFranchiseBrokerageReportForAllAP: "/v1/korp/getDailyFranchiseBrokerageReportForAllAP",
    },
    BSE_STAR: {
      AUTHENTICATION: "/v1/bse-star/authentication",
      SIP_CREATE: "/v1/bse-star/sipCreate",
      LUMPSUM_CREATE: "/v1/bse-star/lumpsumCreate",
    },
    ACCOUNT_OPENING_DASHBOARD: {
      LIST: "/v1/account-opening-dashboard/list",
      
    },
    IPO: {
      LOGIN: "/v1/ipo/login",
      IPO_MASTER: "/v1/ipo/master",
      CRON_RUN: "/v1/ipo/cronRun",
      TRANSACTION_ADD: "/v1/ipo/transactionAdd",
      TRANSACTION_LIST: "/v1/ipo/transactionList",
      CMS_IPO_UPDATED: "/v1/ipo/cmsIpoUpdate",
      BUY_IPO: "/v1/ipo/buyIpo",
    },
    PRODUCT_IPO: {
      list: "/v1/Product-Ipo/list",
      create: "/v1/Product-Ipo/create",
      get: "/v1/Product-Ipo/get",
      update: "/v1/Product-Ipo/update",
      delete: "/v1/Product-Ipo/delete",
      countItems: "/v1/Product-Ipo/count",
    },
    MUTUAL_FUND: {
      list: "/v1/Mutual-Ipo/list",
      create: "/v1/Mutual-Fund/create",
      get: "/v1/Mutual-Ipo/get",
      update: "/v1/Mutual-Ipo/update",
      delete: "/v1/Mutual-Ipo/delete",
    },  
    AP_REVENUE: {
      list: "/v1/AP-REVENUE/list",
      create: "/v1/AP-REVENUE/create",
      get: "/v1/AP-REVENUE/get",
      update: "/v1/AP-REVENUE/update",
      delete: "/v1/AP-REVENUE/delete",
    },
    VALIDATE_UPI:"/v1/validateUPI",
  },
};

module.exports = { routes };
