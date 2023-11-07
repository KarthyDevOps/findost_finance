const cron = require("node-cron");
const {getDailyTurnOverBrokerageReportForAllAP,getDailyFranchiseBrokerageReportForAllAP} = require("../controllers/cron.controller");
module.exports = {
  getDailyTurnOverBrokerageReportForAllAP: function () {
    console.log("getDailyTurnOverBrokerageReportForAllAP running ---->");
    cron.schedule(
      "55 23 * * *",
      async () => {
        console.log("getDailyTurnOverBrokerageReportForAllAP start ---->");
        await getDailyTurnOverBrokerageReportForAllAP();
        console.log("getDailyTurnOverBrokerageReportForAllAP end ---->");
      },
      {
        scheduled: true,
        timezone: "Asia/kolkata",
      }
    );
  },

  getDailyFranchiseBrokerageReportForAllAP: function () {
    console.log("getDailyFranchiseBrokerageReportForAllAP running ---->");
    cron.schedule(
      "55 23 * * *",
      async () => {
        console.log("getDailyFranchiseBrokerageReportForAllAP start ---->");
        await couponController.getDailyFranchiseBrokerageReportForAllAP();
        console.log("getDailyFranchiseBrokerageReportForAllAP end ---->");
      },
      {
        scheduled: true,
        timezone: "Asia/kolkata",
      }
    );
  },
  
};
