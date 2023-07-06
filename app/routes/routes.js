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
      MF:{
        CATEGORY_LIST: "/v1/accord-fintech/mf/categoryList",     
        CATEGORY_RETURNS: "/v1/accord-fintech/mf/categoryReturnsList",     
        SCHEME_LIST: "/v1/accord-fintech/mf/schemeList",
        GET_SCHEME_FILTERED_LIST : "/v1/accord-fintech/mf/schemeFilteredList",
        GET_SCHEME_NAV_DETAILS : "/v1/accord-fintech/mf/getSchemeNAVDetails",
        MF_SNAPSHOT_SUMMARY : "/v1/accord-fintech/mf/getMFSnapshotSummary",
        SYSTEMATIC_INVESTMENT_PATTERN  : "/v1/accord-fintech/mf/getSystematicInvestmentpattern",
        ALL_HOLDINGS : "/v1/accord-fintech/mf/allHoldings",
        NFO_UPDATES : "/v1/accord-fintech/mf/nfoUpdates"
      },
      IPO :{
        IPO_ISSUE : "/v1/accord-fintech/ipo/ipoIssue",
        IPO_NEW_LISTING : "/v1/accord-fintech/ipo/ipoNewListing",
        IPO_SNAPSHOT : "/v1/accord-fintech/ipo/ipoSnapshot"
      }
    },
    KORP: {
      AUTHENTICATION : "/v1/korp/authentication",
      CLIENT_LIST : "/v1/korp/clientList"
    }
  },
};

module.exports = { routes };
