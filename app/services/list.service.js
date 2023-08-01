const { CrmTicket } = require("../models/crmTicket");
const { Leads } = require("../models/leads");
const { ProductIPO } = require("../models/productIpo");
const { WatchList } = require("../models/watchList");

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
   if(params?.currentStatus) {
    filter.currentStatus = params.currentStatus 
   }
    if (params?.search) {
      console.log('search', params?.search)
      filter.$or =[
        { clientName: { $regex: `${params?.search}`, $options: "i" } },
        { clientCode: { $regex: `${params?.search}`, $options: "i" } },
        { clientNumber: { $regex: `${params?.search}`, $options: "i" } },
      ]
    }
    console.log('filter--->', filter)
    data = await ProductIPO.find(filter);
  } else {
    let filter = {
isDeleted:false
    };
    if(params?.currentStatus) {
      console.log('params', params)
      filter.currentStatus = params.currentStatus 
     }
    if (params?.isActive) {
      filter.isActive = params.isActive;
    }
    if (params?.category) {
      filter.category = params.category;
    }
    if (params?.subCategory) {
      filter.subCategory = params.subCategory;
    }

    if (params?.search) {
      console.log('search', params?.search)
      filter.$or =[
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


const getProductCountIpoList = async () => {

  let data;
  let totalApplication = ProductIPO.countDocuments();
  let pendingApplication =  ProductIPO.countDocuments({currentStatus:"PENDING",  isDeleted:false});
  let rejectedApplication =  ProductIPO.countDocuments({currentStatus:"REJECTED" ,  isDeleted:true});
  let ipoAllocatedApplication =  ProductIPO.countDocuments({currentStatus:"IPOALLOCATED" ,  isDeleted:false}) ;
  let ipoRejectApplication =  ProductIPO.countDocuments({currentStatus:"IPONONALLOCATED",  isDeleted:false}) ;

  data = await Promise.all([totalApplication, pendingApplication, rejectedApplication, ipoAllocatedApplication, ipoRejectApplication]).then(function (values) {
    let result = [
      {
        title : "totalApplication",
        value : values?.[0],
        status : "totalApplication",
        label:"Total Applications"
      },
      {
        title : "pendingApplication",
        value : values?.[1],
        status : "pendingApplication",
        label:"UPI Mandate Approval Pending"
      },
      {
        title : "rejectedApplication",
        value : values?.[2],
        status : "rejectedApplication",
        label:"Application Rejected"
      },
      {
        title : "ipoAllocatedApplication",
        value : values?.[3],
        status : "ipoAllocatedApplication",
        label:"IPO Allotted"
      },
      {
        title : "ipoRejectApplication",
        value : values?.[4],
        status : "ipoRejectApplication",
        label:"IPO Not Allotted"

      }
    ]
    return result   
  });

  console.log("data-->",data)

  if (data) {
    return { status: true, allValueCount:data };
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
        apId : params.apId,
        $or: [
          { title: { $regex: `${params?.search}`, $options: "i" } },
          { content: { $regex: `${params?.search}`, $options: "i" } },
          { type: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 });
    } else {
      data = await WatchList.find({
        isDeleted: false,
        apId : params.apId,
      });
    }
  } else if (params?.search) {
    data = await WatchList.find({
      isDeleted: false,
      apId : params.apId,
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
      apId : params.apId,
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
    if (params?.search) {
      data = await Leads.find({
        isDeleted: false,
        $or: [
          { productName: { $regex: `${params?.search}`, $options: "i" } },
          { name: { $regex: `${params?.search}`, $options: "i" } },
          { aditionalInfo: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 }).lean();
    } else {
      data = await Leads.find({
        isDeleted: false,
      }).lean();
    }
  } else if (params?.search) {
    data = await Leads.find({
      isDeleted: false,
      $or: [
        { productName: { $regex: `${params?.search}`, $options: "i" } },
        { name: { $regex: `${params?.search}`, $options: "i" } },
        { aditionalInfo: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 }).lean();
  } else {
    data = await Leads.find({
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

module.exports = {
  getCrmTicketList,
  getWatchListList,
  getProductIpoList,
  getProductCountIpoList,
  getLeadList
};
