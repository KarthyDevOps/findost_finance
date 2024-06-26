const { authorizedPersonRevenue } = require("../models/authorizedPersonRevenue");
const { CrmTicket } = require("../models/crmTicket");
const { Leads } = require("../models/leads");
const { mutualFund } = require("../models/mutualFund");
const { ProductIPO } = require("../models/productIpo");
const { WatchList } = require("../models/watchList");

const moment = require('moment')

const getCrmTicketList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await CrmTicket.find({
        isDeleted: false,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 }).lean();
    } else {
      data = await CrmTicket.find({
        isDeleted: false,
      }).lean();
    }
  } else if (params?.search) {
    data = await CrmTicket.find({
      isDeleted: false,
      $or: [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { content: { $regex: `${params?.search}`, $options: "i" } },
        { type: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 }).lean();
  } else {
    data = await CrmTicket.find({
      isDeleted: false,
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 }).lean();
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};


const getProductIpoList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.currentStatus) {
      filter.currentStatus = params.currentStatus
    }
    if (params?.search) {
      console.log('search', params?.search)
      filter.$or = [
        { clientName: { $regex: `${params?.search}`, $options: "i" } },
        { clientCode: { $regex: `${params?.search}`, $options: "i" } },
        { clientNumber: { $regex: `${params?.search}`, $options: "i" } },
      ]
    }
    console.log('filter--->', filter)
    data = await ProductIPO.find(filter);
  } else {
    let filter = {
      isDeleted: false
    };
    if (params?.currentStatus) {
      console.log('params', params)
      filter.currentStatus = params.currentStatus
    }
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      console.log('search', params?.search)
      filter.$or = [
        { clientName: { $regex: `${params?.search}`, $options: "i" } },
        { clientCode: { $regex: `${params?.search}`, $options: "i" } },
        { clientNumber: { $regex: `${params?.search}`, $options: "i" } },
      ]
    }
    data = await ProductIPO.find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};

const getMutualFundList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    
    console.log('filter--->', filter)
    data = await mutualFund.find(filter);
  } else {
    let filter = {
      isDeleted: false
    };
    
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    data = await mutualFund.find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};
const getAuthorizedPersonSchemaList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params.startDate && params.endDate) {
      console.log("BothDate all-->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = { $gte: formattedStartDate, $lte: formattedEndDate };
    }
    
    console.log('filter--->', filter)
    data = await authorizedPersonRevenue.find(filter);
  } else {
    let filter = {
      isDeleted: false
    };
    
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params.startDate && params.endDate) {
      console.log("BothDate all-->",params)
      let formattedStartDate = moment(new Date(params?.startDate)).startOf('day');
      let formattedEndDate = moment(new Date(params?.endDate)).endOf('day');
      filter.createdAt = { $gte: formattedStartDate, $lte: formattedEndDate };
    }
    data = await authorizedPersonRevenue.find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};


const getProductCountIpoList = async () => {

  let data;
  let totalApplication = ProductIPO.countDocuments();
  let pendingApplication = ProductIPO.countDocuments({ currentStatus: "PENDING", isDeleted: false });
  let rejectedApplication = ProductIPO.countDocuments({ currentStatus: "REJECTED", isDeleted: false });
  let ipoAllocatedApplication = ProductIPO.countDocuments({ currentStatus: "IPOALLOCATED", isDeleted: false });
  let ipoRejectApplication = ProductIPO.countDocuments({ currentStatus: "IPONONALLOCATED", isDeleted: false });

  data = await Promise.all([totalApplication, pendingApplication, rejectedApplication, ipoAllocatedApplication, ipoRejectApplication]).then(function (values) {
    let result = [
      {
        title: "totalApplication",
        value: values?.[0],
        status: "ACCEPTED",
        label: "Total Applications"
      },
      {
        title: "pendingApplication",
        value: values?.[1],
        status: "PENDING",
        label: "UPI Mandate Approval Pending"
      },
      {
        title: "rejectedApplication",
        value: values?.[2],
        status: "REJECTED",
        label: "Application Rejected"
      },
      {
        title: "ipoAllocatedApplication",
        value: values?.[3],
        status: "IPOALLOCATED",
        label: "IPO Allotted"
      },
      {
        title: "ipoRejectApplication",
        value: values?.[4],
        status: "IPONONALLOCATED",
        label: "IPO Not Allotted"

      }
    ]
    return result
  });

  console.log("data-->", data)

  if (data) {
    return { status: true, allValueCount: data };
  } else {
    return { status: false, data: [] };
  }


}

const getWatchListList = async (params) => {
  let data;
  if (params.all) {
    if (params?.search) {
      data = await WatchList.find({
        isDeleted: false,
        apId: params.apId,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await WatchList.find({
        isDeleted: false,
        apId: params.apId,
      });
    }
  } else if (params?.search) {
    data = await WatchList.find({
      isDeleted: false,
      apId: params.apId,
      $or: [
        { title: { $regex: `${params?.search}`, $options: "i" } },
        { content: { $regex: `${params?.search}`, $options: "i" } },
        { type: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  } else {
    data = await WatchList.find({
      isDeleted: false,
      apId: params.apId,
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};


const getLeadList = async (params) => {
  let data;
  if (params.all) {
    let filter = {
      isDeleted:false
    };
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.productName) {
      filter.productName = params.productName
    }
    if (params?.search) {
      console.log('search', params?.search)
      filter.$or = [
        {"clientDetails.clientName": { $regex: `${params?.search}`, $options: "i" } },
        { "clientDetails.clientCode": { $regex: `${params?.search}`, $options: "i" } },
      ]
    }
  
    data = await Leads.find(filter);
  } else {
    let filter = {
      isDeleted: false
    };
    if (params?.productName) {
      filter.productName = params.productName
    }
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.search) {
      console.log('search', params?.search)
      filter.$or = [
        {"clientDetails.clientName": { $regex: `${params?.search}`, $options: "i" } },
        { "clientDetails.clientCode": { $regex: `${params?.search}`, $options: "i" } },
      ]
    }
    data = await Leads.find(filter)
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 });
  }
  if (data && data.length) {
    return { status: true, data: data };
  } else {
    return { status: false, data: [] };
  }
};


module.exports = {
  getCrmTicketList,
  getWatchListList,
  getProductIpoList,
  getMutualFundList,
  getProductCountIpoList,
  getLeadList,
  getAuthorizedPersonSchemaList
};
