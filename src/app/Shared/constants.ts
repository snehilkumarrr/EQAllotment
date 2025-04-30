export const BASE_URL                      = 'http://10.64.24.46:8080/quota-backend';
//export const BASE_URL                      = 'http://localhost:8080/PIS';

export const POST_LOGIN_URL = '/auth/login';

export const RoleName = {
  "roleMp":"ROLE_MP",
  "roleAa": "ROLE_AA",
  "roleRail":"ROLE_RAILWAY",
}


export const api = {
  "noAuthCaptcha": "/noauth/captcha",
  "loginwithcaptcha": "/noauth/loginwithcaptcha",
  "otpValidate" : "/noauth/otpvalidate",
  "authPnr": "/auth/mp/external/pnrEnquiry",
  "sendRequest": "/auth/mp/getAllSentRequests",
  "saveEqRequest": "/auth/mp/saveEqRequest",
  "aaGetEqRequest" : "/auth/aa/getEQRequest",
  "getAllZones":"/auth/basic/zones",
  "getDivisionByCode":"/auth/basic/divbyzone",
  "aaSendRequest": "/auth/aa/getAllSentRequests",
  "aaSaveEqRequest": "/auth/aa/saveEqRequest",
  "aaTakeAction": "/auth/aa/takeAction",
  "railGetAllEqRequest": "/auth/railway/getAllSentRequests",
  "railGetEqRequest": "/auth/railway/getEQRequest",
  "railTakeAction": "/auth/railway/takeAction",
};
  
