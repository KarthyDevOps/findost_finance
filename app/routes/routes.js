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
        GET_FUND_FACT_SHEET: "/v1/accord-fintech/mf/getFundFactsheet"
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
      CLIENT_LIST: "/v1/korp/clientList",
      CLIENT_DETAILS_API : "/v1/korp/clientDetails",
      CLIENT_PROFILE: "/v1/korp/clientProfile",
      CLIENT_DASHBOARD: "/v1/korp/clientDashboard",
      CLIENT_MASTER: "/v1/korp/clientMaster"

    },
    BSE_STAR: {
      AUTHENTICATION: "/v1/bse-star/authentication",
      SIP_CREATE: "/v1/bse-star/sipCreate",
      LUMPSUM_CREATE: "/v1/bse-star/lumpsumCreate",

    },
    PRODUCT_IPO: {
      list: "/v1/Product-Ipo/list",
      create: "/v1/Product-Ipo/create",
      get: "/v1/Product-Ipo/get",
      update: "/v1/Product-Ipo/update",
      delete: "/v1/Product-Ipo/delete",
      countItems: "/v1/Product-Ipo/count",
    }
  },
};

module.exports = { routes };
