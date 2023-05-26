const cron = require("node-cron");
const { couponController } = require("./../controllers");
module.exports = {
  couponInaciveCron: function () {
    console.log("couponInaciveCron running ---->");
    cron.schedule(
      "55 23 * * *",
      async () => {
        console.log("couponInaciveCron start ---->");
        await couponController.inActivateCouponIsExpired();
        console.log("couponInaciveCron end ---->");
      },
      {
        scheduled: true,
        timezone: "Asia/kolkata",
      }
    );
  },
};
