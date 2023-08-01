let { Rest } = require("./../restCalls");
let { bseStarAPI } = require("../configs");
const qs = require("qs");
const axios = require('axios');
const xml2js = require('xml2js');
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
}
const buildMFLUMPSUMSoapRequest  = async (data) => {
  return `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://bsestarmf.in/MFOrderEntry/orderEntryParam</wsa:Action><wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To></soap:Header>
   <soap:Body>
      <bses:orderEntryParam>
         <bses:TransCode></bses:TransCode>
         <bses:TransNo></bses:TransNo>
         <bses:OrderId></bses:OrderId>
         <bses:UserID></bses:UserID>
         <bses:MemberId></bses:MemberId>
         <bses:ClientCode></bses:ClientCode>
         <bses:SchemeCd></bses:SchemeCd>
         <bses:BuySell></bses:BuySell>
         <bses:BuySellType></bses:BuySellType>
         <bses:DPTxn></bses:DPTxn>
         <bses:OrderVal></bses:OrderVal>
         <bses:Qty></bses:Qty>
         <bses:AllRedeem></bses:AllRedeem>
         <bses:FolioNo></bses:FolioNo>
         <bses:Remarks></bses:Remarks>
         <bses:KYCStatus></bses:KYCStatus>
         <bses:RefNo></bses:RefNo>
         <bses:SubBrCode></bses:SubBrCode>
         <bses:EUIN></bses:EUIN>
         <bses:EUINVal></bses:EUINVal>
         <bses:MinRedeem></bses:MinRedeem>
         <bses:DPC></bses:DPC>
         <bses:IPAdd></bses:IPAdd>
         <bses:Password></bses:Password>
         <bses:PassKey></bses:PassKey>
         <bses:Parma1></bses:Parma1>
         <bses:Param2></bses:Param2>
         <bses:Param3></bses:Param3>
         <bses:MobileNo></bses:MobileNo>
         <bses:EmailID></bses:EmailID>
         <bses:MandateID></bses:MandateID>
         <bses:Filler1></bses:Filler1>
         <bses:Filler2></bses:Filler2>
         <bses:Filler3></bses:Filler3>
         <bses:Filler4></bses:Filler4>
         <bses:Filler5></bses:Filler5>
         <bses:Filler6></bses:Filler6>
      </bses:orderEntryParam>
   </soap:Body>
</soap:Envelope>
  `;
}
const buildMFSIPSoapRequest = async (data) => {
  return `
  <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:bses="http://bsestarmf.in/">
   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"><wsa:Action>http://bsestarmf.in/MFOrderEntry/sipOrderEntryParam</wsa:Action><wsa:To>https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure</wsa:To></soap:Header>
   <soap:Body>
      <bses:sipOrderEntryParam>
         <bses:TransactionCode></bses:TransactionCode>
         <bses:UniqueRefNo></bses:UniqueRefNo>
         <bses:SchemeCode></bses:SchemeCode>
         <bses:MemberCode></bses:MemberCode>
         <bses:ClientCode></bses:ClientCode>
         <bses:UserID></bses:UserID>
         <bses:InternalRefNo></bses:InternalRefNo>
         <bses:TransMode></bses:TransMode>
         <bses:DpTxnMode></bses:DpTxnMode>
         <bses:StartDate></bses:StartDate>
         <bses:FrequencyType></bses:FrequencyType>
         <bses:FrequencyAllowed></bses:FrequencyAllowed>
         <bses:InstallmentAmount></bses:InstallmentAmount>
         <bses:NoOfInstallment></bses:NoOfInstallment>
         <bses:Remarks></bses:Remarks>
         <bses:FolioNo></bses:FolioNo>
         <bses:FirstOrderFlag></bses:FirstOrderFlag>
         <bses:SubberCode></bses:SubberCode>
         <bses:Euin></bses:Euin>
         <bses:EuinVal></bses:EuinVal>
         <bses:DPC></bses:DPC>
         <bses:RegId></bses:RegId>
         <bses:IPAdd></bses:IPAdd>
         <bses:Password></bses:Password>
         <bses:PassKey></bses:PassKey>
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
}
const makeSoapRequest = async (url, xml) => {
  try {
    const response = await axios.post(url, xml, {
      headers: {
        'Content-Type': 'application/soap+xml',
      },
    });
    console.log('response.data',response.data)
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(response.data);
    return result['soapenv:Envelope']['soapenv:Body'];
  } catch (error) {
    console.error('Error making SOAP request:', error);
    throw error;
  }
}
const bseStarauthenticationAPI = async (data) => {
  let payload = {
    'userId' : process.env.BSE_STAR_USERID,
    'memberId' : process.env.BSE_STAR_MEMBERID,
    'password' : process.env.BSE_STAR_PASSSWORD,
    'passkey' : process.env.BSE_STAR_PASSKEY,
  }
  const soapRequestXml = await buildAUTHSoapRequest(payload);
  console.log(soapRequestXml,'soapRequestXml')
  const weatherApiUrl = 'https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure';
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  console.log('SOAP Response:', soapResponse);
  return soapResponse
};
const bseStarSipCreateAPI = async (data) => {
  const soapRequestXml = await buildMFSIPSoapRequest(data);
  console.log(soapRequestXml,'soapRequestXml')
  const weatherApiUrl = 'https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure';
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  console.log('SOAP Response:', soapResponse);
  return soapResponse
};
const bseStarLumpsumCreateAPI = async (data) => {
 
  const soapRequestXml = await buildMFLUMPSUMSoapRequest(data);
  console.log(soapRequestXml,'soapRequestXml')
  const weatherApiUrl = 'https://bsestarmfdemo.bseindia.com/MFOrderEntry/MFOrder.svc/Secure';
  const soapResponse = await makeSoapRequest(weatherApiUrl, soapRequestXml);
  console.log('SOAP Response:', soapResponse);
  return soapResponse
};
module.exports = {
    bseStarauthenticationAPI,
    bseStarSipCreateAPI,
    bseStarLumpsumCreateAPI,
};
