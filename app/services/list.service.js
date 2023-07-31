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
    if (params?.search) {
      data = await ProductIPO.find({
        isDeleted: false,
        $or: [
          { clientName: { $regex: `${params?.search}`, $options: "i" } },
          { clientCode: { $regex: `${params?.search}`, $options: "i" } },
        ],
      }).sort({ createdAt: -1 }).lean();
    } else {
      data = await ProductIPO.find({
        isDeleted: false,
      }).lean();
    }
  } else if (params?.search) {
    data = await ProductIPO.find({
      isDeleted: false,
      $or: [
        { clientName: { $regex: `${params?.search}`, $options: "i" } },
        { clientCode: { $regex: `${params?.search}`, $options: "i" } },
      ],
    })
      .skip((params.page - 1) * params.limit)
      .limit(params.limit)
      .sort({ createdAt: -1 }).lean();
  } else {
    data = await ProductIPO.find({
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

const getProductCountIpoList = async () => {

  let data;
  let totalApplication = ProductIPO.countDocuments();
  let pendingApplication =  ProductIPO.countDocuments({currentStatus:"PENDING",  isDeleted:false});
  let rejectedApplication =  ProductIPO.countDocuments({currentStatus:"REJECTED" ,  isDeleted:true});
  let ipoAllocatedApplication =  ProductIPO.countDocuments({currentStatus:"IPOALLOCATED" ,  isDeleted:false}) ;
  let ipoRejectApplication =  ProductIPO.countDocuments({currentStatus:"IPONONALLOCATED",  isDeleted:false}) ;

  data = await Promise.all([totalApplication, pendingApplication, rejectedApplication, ipoAllocatedApplication, ipoRejectApplication]).then(function (values) {
    let result = {
      totalApplication: values?.[0],
      pendingApplication: values?.[1],
      rejectedApplication: values?.[2],
      ipoAllocatedApplication: values?.[3],
      ipoRejectApplication: values?.[4]
    }
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
