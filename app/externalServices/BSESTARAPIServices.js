let { Rest } = require("./../restCalls");
let { bseStarAPI } = require("../configs");
const qs = require("qs");
const axios = require("axios");
const xml2js = require("xml2js");
const buildAUTHSoapRequest = async (data) => {
  return `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://bsestarmf.in/MFOrderEntry/getPassword</wsa:Action><wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To></soap:Header>
    <soap:Body>
      <bses:getPassword>
          <bses:UserId>${data.userId}</bses:UserId>
          <bses:Password>${data.password}</bses:Password>
          <bses:PassKey>${data.passkey}</bses:PassKey>
      </bses:getPassword>
    </soap:Body>
  </soap:Envelope>`;
};
const buildMFLUMPSUMSoapRequest = async (data) => {
  return `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action>
        <wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To>
    </soap:Header>
    <soap:Body>
        <bses:orderEntryParam>
            <bses:TransCode>${data.TransCode || "NEW"} </bses:TransCode>
            <bses:TransNo>${data.sequenceNumber}</bses:TransNo>
            <bses:OrderId/>
            <bses:UserID>${data.UserID}</bses:UserID>
            <bses:MemberId>${data.MemberId}</bses:MemberId>
            <bses:ClientCode>${data.clientCode}</bses:ClientCode>
            <bses:SchemeCd>${data.schemeCode}</bses:SchemeCd>
            <bses:BuySell>P</bses:BuySell>
            <bses:BuySellType>FRESH</bses:BuySellType>
            <bses:DPTxn>C</bses:DPTxn>
            <bses:OrderVal>${data.orderVal}</bses:OrderVal>
            <bses:Qty/>
            <bses:AllRedeem>N</bses:AllRedeem>
            <bses:FolioNo/>
            <bses:Remarks/>
            <bses:KYCStatus>Y</bses:KYCStatus>
            <bses:RefNo>${data.APId}</bses:RefNo>
            <bses:SubBrCode/>
            <bses:EUIN/>
            <bses:EUINVal>N</bses:EUINVal>
            <bses:MinRedeem>N</bses:MinRedeem>
            <bses:DPC>Y</bses:DPC>
            <bses:IPAdd/>
            <bses:Password>${data.token}</bses:Password>
            <bses:PassKey>${data.PassKey}</bses:PassKey>
            <bses:Parma1/>
            <bses:Param2/>
            <bses:Param3/>
            <bses:MobileNo/>
            <bses:EmailID/>
            <bses:MandateID/>
            <bses:Filler1/>
            <bses:Filler2/>
            <bses:Filler3/>
            <bses:Filler4/>
            <bses:Filler5/>
            <bses:Filler6/>
        </bses:orderEntryParam>
    </soap:Body>
</soap:Envelope>
  `;
};
const buildMFSIPSoapRequest = async (data) => {
  return `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://bsestarmf.in/MFOrderEntry/sipOrderEntryParam</wsa:Action><wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To></soap:Header>
   <soap:Body>
      <bses:sipOrderEntryParam>
        <bses:TransactionCode>${data.TransCode || "NEW"} </bses:TransactionCode>
         <bses:UniqueRefNo>${data.sequenceNumber}</bses:UniqueRefNo>
         <bses:SchemeCode>${data.schemeCode}</bses:SchemeCode>
         <bses:MemberCode>${data.MemberId}</bses:MemberCode>
         <bses:ClientCode>${data.clientCode}</bses:ClientCode>
         <bses:UserID>${data.UserID}</bses:UserID>
         <bses:InternalRefNo>${data.APId}</bses:InternalRefNo>
         <bses:TransMode>P</bses:TransMode>
         <bses:DpTxnMode>P</bses:DpTxnMode>
         <bses:StartDate></bses:StartDate>
         <bses:FrequencyType>${data.SIPFrequency}</bses:FrequencyType>
         <bses:FrequencyAllowed>1</bses:FrequencyAllowed>
         <bses:InstallmentAmount>${data.SIPAmount}</bses:InstallmentAmount>
         <bses:NoOfInstallment>${
           data.numberOfInstallments
         }</bses:NoOfInstallment>
         <bses:Remarks>${data.APId}</bses:Remarks>
         <bses:FolioNo></bses:FolioNo>
         <bses:FirstOrderFlag>Y</bses:FirstOrderFlag>
         <bses:SubberCode></bses:SubberCode>
         <bses:Euin></bses:Euin>
         <bses:EuinVal></bses:EuinVal>
         <bses:DPC></bses:DPC>
         <bses:RegId></bses:RegId>
         <bses:IPAdd></bses:IPAdd>
         <bses:Password>${data.token}</bses:Password>
         <bses:PassKey>${data.PassKey}</bses:PassKey>
         <bses:Param1></bses:Param1>
         <bses:Param2></bses:Param2>
         <bses:Param3></bses:Param3>
         <bses:Filler1></bses:Filler1>
         <bses:Filler2></bses:Filler2>
         <bses:Filler3></bses:Filler3>
         <bses:Filler4></bses:Filler4>
         <bses:Filler5></bses:Filler5>
         <bses:Filler6></bses:Filler6>
      </bses:sipOrderEntryParam>
   </soap:Body>
</soap:Envelope>
  `;
};
const makeSoapRequest = async (url, xml) => {
  try {
    const response = await axios.post(url, xml, {
      headers: {
        "Content-Type": "application/soap+xml",
      },
    });
    console.log("response.data", response.data);
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    console.log(result, "result---");
    return result["s:Envelope"]["s:Body"];
  } catch (error) {
    console.error("Error making SOAP request:", error);
    throw error;
  }
};
const bseStarauthenticationAPI = async (data) => {
  let payload = {
    userId: process.env.BSE_STAR_USERID,
    memberId: process.env.BSE_STAR_MEMBERID,
    password: process.env.BSE_STAR_PASSSWORD,
    passkey: process.env.BSE_STAR_PASSKEY,
  };
  const soapRequestXml = await buildAUTHSoapRequest(payload);
  console.log(soapRequestXml, "soapRequestXml");
  const weatherApiUrl =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  if (soapResponse?.getPasswordResponse?.getPasswordResult) {
    let pwdResp = soapResponse?.getPasswordResponse?.getPasswordResult;
    pwdResp = pwdResp.split("|");
    if (pwdResp[0] == (100 || "100")) {
      return pwdResp[1];
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const bseStarSipCreateAPI = async (data) => {
  const soapRequestXml = await buildMFSIPSoapRequest(data);
  console.log(soapRequestXml, "soapRequestXml");
  const weatherApiUrl =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  console.log("SOAP Response:", soapResponse);
  return soapResponse;
};
const bseStarLumpsumCreateAPI = async (data) => {
  const soapRequestXml = await buildMFLUMPSUMSoapRequest(data);
  console.log(soapRequestXml, "soapRequestXml");
  const weatherApiUrl =
    "https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure";
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  console.log("SOAP Response:", soapResponse);
  return soapResponse;
};
module.exports = {
  bseStarauthenticationAPI,
  bseStarSipCreateAPI,
  bseStarLumpsumCreateAPI,
};
