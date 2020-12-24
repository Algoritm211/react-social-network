import {IGetCaptchaURL, instanceAxios} from "./api";

export const securityAPI = {
  getCaptchaURL() {
    return instanceAxios.get<IGetCaptchaURL>('security/get-captcha-url')
  }
}