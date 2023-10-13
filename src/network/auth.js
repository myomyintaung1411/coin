import network from './index.js'

export default {
  LoginApi(data) {
    return network({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  RegisterApi(data) {
    return network({
      url: '/user/regist',
      method: 'post',
      data
    })
  },
  GetAuthCodeApi(data) {
    return network({
      url: '/user/getAuthCode',
      method: 'post',
      data
    })
  },
  GetPhoneCaptchaApi(data) {
    return network({
      url: '/user/get_phone_captcha',
      method: 'post',
      data
    })
  }
}

