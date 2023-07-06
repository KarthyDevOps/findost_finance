module.exports = function (env) {
  const DEV_CONSTANTS = {
    PORT: 2276,
    MONGO_URI: "mongodb+srv://findoc_user:nQKMemhPm0N4maIJ@cluster0.kr4lh0f.mongodb.net/findoc_communication",
    NODE_ENV: "development",
    SERVICE_NAME : "Findost-Finance-Service",
    USER_URL : "http://doodlebluelive.com:2277",
    200: "success",
    USER_URL: process.env.USER_URL,
    COMMUNICATION_URL: process.env.COMMUNICATION_URL,
    CMS_URL: process.env.CMS_URL,
    FINANCE_URL: process.env.FINANCE_URL,

    ACCORD_FINTECH_LOGIN_TOKEN : "VhbjCOV2kEQQIYY8KgcNETS6SmoPp2v4",
    KORP_BASE_URL :"http://122.160.148.72:15000/api",
    KORP_USER_NAME :"API_RS",
    KORP_PASSWORD : "FinDoc3Gzd&$"

  };

  const LOCAL_CONSTANTS = {
    PORT: 2276,
    MONGO_URI: "mongodb+srv://findoc_user:nQKMemhPm0N4maIJ@cluster0.kr4lh0f.mongodb.net/findoc_communication",
    NODE_ENV: "development",
    SERVICE_NAME : "Findost-Finance-Service",
    USER_URL : "http://doodlebluelive.com:2277",
    200: "success",
    USER_URL: process.env.USER_URL,
    COMMUNICATION_URL: process.env.COMMUNICATION_URL,
    CMS_URL: process.env.CMS_URL,
    FINANCE_URL: process.env.FINANCE_URL,
    ACCORD_FINTECH_LOGIN_TOKEN : process.env.ACCORD_FINTECH_LOGIN_TOKEN,
    KORP_BASE_URL :process.env.KORP_BASE_URL,
    KORP_USER_NAME :process.env.KORP_USER_NAME,
    KORP_PASSWORD :process.env.KORP_PASSWORD
  };

  const PROD_CONSTANTS = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    SERVICE_NAME :  process.env.SERVICE_NAME,
    USER_URL : process.env.USER_URL,
    200: "success",
    USER_URL: process.env.USER_URL,
    COMMUNICATION_URL: process.env.COMMUNICATION_URL,
    CMS_URL: process.env.CMS_URL,
    FINANCE_URL: process.env.FINANCE_URL,
    ACCORD_FINTECH_LOGIN_TOKEN : process.env.ACCORD_FINTECH_LOGIN_TOKEN,
    KORP_BASE_URL :process.env.KORP_BASE_URL,
    KORP_USER_NAME :process.env.KORP_USER_NAME,
    KORP_PASSWORD :process.env.KORP_PASSWORD
  };
  let envType;

  switch(env){
      
    case "DEV": envType = DEV_CONSTANTS;
                break;

    case "LOCAL": envType = LOCAL_CONSTANTS;
                break;
    
    case "PROD": envType = PROD_CONSTANTS;
                break;
                
    default   : envType = {NA: "NA"};
                break;
  }

  return envType;
};
