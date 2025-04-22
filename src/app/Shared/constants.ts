export const BASE_URL                      = 'http://10.64.24.46:8080/quota-backend';
//export const BASE_URL                      = 'http://localhost:8080/PIS';

export const POST_LOGIN_URL = '/auth/login';

export const RoleName = {
  "ROLE_MP": 1,
  "ROLE_ZONAL_ADMIN": 2,
  "ROLE_DIVISIONAL_ADMIN": 3,
}


export const api = {
  "noAuthCaptcha": "/noauth/captcha",
  "loginwithcaptcha": "/noauth/loginwithcaptcha",
  "otpValidate" : "/noauth/otpvalidate",
  "authPnr": "/auth/mp/external/pnrEnquiry"
};