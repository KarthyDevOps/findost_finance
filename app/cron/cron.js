const cron = require("node-cron");
const {
  getDailyTurnOverBrokerageReportForAllAP,
  getDailyFranchiseBrokerageReportForAllAP,
  getDailyIPO
} = require("../controllers/cron.controller");
module.exports = {
  getDailyTurnOverBrokerageReportForAllAP: function () {
    console.log("getDailyTurnOverBrokerageReportForAllAP running ---->");
    cron.schedule(
      "59 23 * * *",
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
      "59 23 * * *",
      async () => {
        console.log("getDailyFranchiseBrokerageReportForAllAP start ---->");
        await getDailyFranchiseBrokerageReportForAllAP();
        console.log("getDailyFranchiseBrokerageReportForAllAP end ---->");
      },
      {
        scheduled: true,
        timezone: "Asia/kolkata",
      }
    );
  },
  getDailyIPO: function () {
    cron.schedule(
      "1 0 * * *",
      async () => {
        console.log("getDailyIPO start ---->");
        await getDailyIPO();
        console.log("getDailyIPO end ---->");
      },
      {
        scheduled: true,
        timezone: "Asia/kolkata",
      }
    );
  },
};
