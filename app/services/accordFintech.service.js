const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const {
    AccordFintechAPIServices,KORPAPIServices
} = require("../externalServices");
const {
  
  pageMetaService,
} = require("../helpers/index");
const { WatchList } = require("../models/watchList");
const moment = require("moment");

const GetFundsListService = async (params) => {
  let resp = await AccordFintechAPIServices.GetFundsListAPI(params);
  if(resp == "Bad Request")
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: "Bad Request",
      data: resp
    };
  }
  //console.log(resp)
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp.Table || []
  };
};
const categoryListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryListAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    //console.log(resp)
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || []
    };
};
const categoryReturnsListService = async (params) => {
    let resp = await AccordFintechAPIServices.categoryReturnsAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: { list:  resp?.Table || [], pageMeta },
    };
   
};

const schemesListService = async (params) => {
    let resp = await AccordFintechAPIServices.schemesListAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || []
    };
};


const getSchemeWithInfoService = async (params) => {
  let resp = await AccordFintechAPIServices.getSchemeWithInfoAPI(params);
  if(resp == "Bad Request")
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: "Bad Request",
      data: resp
    };
  }
  let getMyWatchlist =  await WatchList.find({apId : params.apId,isDeleted:false});
  let myschemeCodes = getMyWatchlist.map((data)=>data.schemeCode)
  if(resp?.Table)
  {
    resp.Table = resp.Table.map((data)=>{
      data.isAlreadyExistMyWatchlist =false
      if(myschemeCodes.indexOf(data.SCHEMECODE) > -1)
      {
        data.isAlreadyExistMyWatchlist =true
      }
      return data
    })
  }
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRecords || 0);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: { list:  resp?.Table || [], pageMeta },
    };
};


const getFundFactsheetService = async (params) => {
    let resp = await AccordFintechAPIServices.getFundFactsheetAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    let getMyWatchlist =  await WatchList.findOne({apId : params.apId,isDeleted:false,schemeCode:params.Schemecode});
    if(resp && resp?.snapshot_summary?.[0])
    {
      resp.snapshot_summary[0].isAlreadyExistMyWatchlist = getMyWatchlist ? true : false
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || []
    };
};

const GetMFNAVGraphService = async (params) => {
  let resp = await AccordFintechAPIServices.GetMFNAVGraphAPI(params);
  if(resp == "Bad Request")
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: "Bad Request",
      data: resp
    };
  }
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    message: messages?.success,
    data: resp.Table || []
  };
};


const getSchemesFilteredListService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemesFilteredListAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getSchemeNAVDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getSchemeNAVDetailsAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const getMFSnapshotDetailsService = async (params) => {
    let resp = await AccordFintechAPIServices.getMFSnapshotDetailsAPI(params);
    
    console.log('resp',resp)
    if(resp != "Bad Request")
    {
      return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp || []
      };
    }
    else
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data:resp
      };
    }
    
};
const getSystematicInvestmentpatternService = async (params) => {
    let resp = await AccordFintechAPIServices.getSystematicInvestmentpatternAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};
const allHoldingsService = async (params) => {
    let resp = await AccordFintechAPIServices.allHoldingsAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const ipoIssueService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoIssueAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      data: { list:  resp?.Table || [], pageMeta },
    };
};

const ipoNewListingService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoNewListingAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const ipoSnapshotService = async (params) => {
    let resp = await AccordFintechAPIServices.ipoSnapshotAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp || null
    };
};

const nfoUpdatesService = async (params) => {
    let resp = await AccordFintechAPIServices.NFOUpdatesAPI(params);
    if(resp == "Bad Request")
    {
      return {
        status: false,
        statusCode: statusCodes?.HTTP_BAD_REQUEST,
        message: "Bad Request",
        data: resp
      };
    }
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.success,
      data: resp.Table || null
    };
};


const getCorporateNewsService = async (params) => {
  let resp = await AccordFintechAPIServices.getCorporateNewsAPI(params);
  if(resp == "Bad Request")
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: "Bad Request",
      data: resp
    };
  }
  console.log(resp)
  resp.Table = resp.Table.map((e)=>{
    e.Newsdate =  moment(e.Newsdate).format("DD-MM-YYYY")
    if(e.NewsTime)
    {
      e.NewsTime =e.NewsTime.split(" ")
      e.NewsTime =e.NewsTime[1] + ' '+e.NewsTime[2]
      e.NewsTime = moment(e.NewsTime, ["h:mm A"]).format("HH:mm");
    }
    
    return e
  })
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list:  resp?.Table || [], pageMeta },
  };

};

const getEconomyNewsService = async (params) => {
  let resp = await AccordFintechAPIServices.getEconomyNewsAPI(params);
  if(resp == "Bad Request")
  {
    return {
      status: false,
      statusCode: statusCodes?.HTTP_BAD_REQUEST,
      message: "Bad Request",
      data: resp
    };
  }
  resp.Table = resp.Table.map((e)=>{
    e.Newsdate =  moment(e.Newsdate).format("DD-MM-YYYY")
    if(e.NewsTime)
    {
      e.NewsTime =e.NewsTime.split(" ")
      e.NewsTime =e.NewsTime[1] + ' '+e.NewsTime[2]
      e.NewsTime = moment(e.NewsTime, ["h:mm A"]).format("HH:mm");
    }
    
    return e
  })
  const pageMeta = await pageMetaService(params, resp?.Table1[0]?.TotalRows || 0);
  return {
    status: true,
    statusCode: statusCodes?.HTTP_OK,
    data: { list:  resp?.Table || [], pageMeta },
  };
 
};

    

module.exports = {
    GetFundsListService,
    categoryListService,
    categoryReturnsListService,
    schemesListService,
    GetMFNAVGraphService,
    getFundFactsheetService,
    getSchemesFilteredListService,
    getSchemeNAVDetailsService,
    getMFSnapshotDetailsService,
    getSystematicInvestmentpatternService,
    allHoldingsService,
    ipoIssueService,
    ipoNewListingService,
    ipoSnapshotService,
    nfoUpdatesService,
    getCorporateNewsService,
    getEconomyNewsService,
    getSchemeWithInfoService
};
