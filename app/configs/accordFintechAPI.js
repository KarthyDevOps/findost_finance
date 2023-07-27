
module.exports = {
    
    GetFundsListAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetFunds",
        headers: {
            contentType: 'application/json',
        }
    },
    categoryListAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetCategory",
        headers: {
            contentType: 'application/json',
        }
    },
    categoryReturnsAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetCategoryReturns",
        headers: {
            contentType: 'application/json',
        }
    },
    
    schemesListAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetScheme",
        headers: {
            contentType: 'application/json',
        }
    },
    getSchemeWithInfoAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetSchemeFiltered",
        headers: {
            contentType: 'application/json',
        }
    },
    GetMFNAVGraphAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetMFNAVGraph",
        headers: {
            contentType: 'application/json',
        }
    },
    
    getFundFactsheetAPI: {
        method: 'GET',
        url: "https://mf.accordwebservices.com/MF/GetFundFactsheet",
        headers: {
            contentType: 'application/json',
        }
    },
    
    getSchemesFilteredListAPI: {
        method: 'GET',
        url: "https://mf.accordwebservices.com/MF/GetSchemeDetails_Filter",
        headers: {
            contentType: 'application/json',
        }
    },
    getSchemeNAVDetailsAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetMFNAVDetails",
        headers: {
            contentType: 'application/json',
        }
    },
    getMFSnapshotDetailsAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetMFSnapShotSummary",
        headers: {
            contentType: 'application/json',
        }
    },
    getSystematicInvestmentpatternAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetNFODetails",
        headers: {
            contentType: 'application/json',
        }
    },
    allHoldingsAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetMFTop10",
        headers: {
            contentType: 'application/json',
        }
    },
    
    ipoIssueAPI: {
        method: 'GET',
        url: "http://ipo.accordwebservices.com/IPO/GetIPOIssues",
        headers: {
            contentType: 'application/json',
        }
    },
    ipoNewListingAPI: {
        method: 'GET',
        url: "http://ipo.accordwebservices.com/IPO/GetNewListing",
        headers: {
            contentType: 'application/json',
        }
    },
    ipoSnapshotAPI: {
        method: 'GET',
        url: "http://ipo.accordwebservices.com/IPO/GetIPOSnapshotDetails",
        headers: {
            contentType: 'application/json',
        }
    },
    NFOUpdatesAPI: {
        method: 'GET',
        url: "http://mf.accordwebservices.com/MF/GetNewFundOffers",
        headers: {
            contentType: 'application/json',
        }
    },
    getCorporateNewsAPI: {
        method: 'GET',
        url: "http://news.accordwebservices.com/News/GetNewsSection",
        headers: {
            contentType: 'application/json',
        }
    },
    
    getEconomyNewsAPI: {
        method: 'GET',
        url: "http://news.accordwebservices.com/News/GetNewsSection",
        headers: {
            contentType: 'application/json',
        }
    },
}