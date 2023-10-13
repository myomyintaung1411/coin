// http/index.js
import axios from 'axios'
import router from '../routes'
import { computed,ref } from 'vue'
import { showToast,showDialog  } from "vant";
import store from '@/store/index'

let BaseUrl = ''
let loginInfo = computed(()=> store.getters["app/LoginData"])

if (process.env.NODE_ENV == 'development') {
  BaseUrl = '/api'
} else {
  BaseUrl = '/api'  // https://api.stockxsms.shop
}

const instance = axios.create({
  baseURL: BaseUrl, // 接口统一域名
  timeout: 6000, // 设置超时
  //withCredentials: true,
})
instance.interceptors.request.use((config) => {
  let token = loginInfo?.value?.token
  //config.headers.Authorization = `Bearer ${token}`
  config.headers.token = `${token}`
  return config
}, (error) => {
  Promise.reject(error)
}
)

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error?.response && error?.response?.status) {
    const status = error.response.status
    let message = ''

    switch (status) {
      case 400:
        message = '请求错误'
        break
      case 401:
        showDialog({
          title: '提示',
          message: '此帐户已在另一台设备上登录',
        }).then(() => {
          window.localStorage.clear();
          setTimeout(() => {
            window.location.reload()
            router.push('/')
          }, 500);
        });
        break
      case 403:
        showToast({ message: "会话已过期，请重新登录", duration: 2000 })
        window.localStorage.clear();
        setTimeout(() => {
          window.location.reload()
          router.push('/')
        }, 500);
        break
      case 404:
        message = '请求地址出错'
        break
      case 408:
        message = '请求超时'
        break
      case 500:
        message = '服务器内部错误!'
        break
      case 501:
        message = '服务未实现!'
        break
      case 502:
        message = '网关错误!'
        break
      case 503:
        message = '服务不可用!'
        break
      case 504:
        message = '网关超时!'
        break
      case 505:
        message = 'HTTP版本不受支持'
        break
      default:
        message = '请求失败'
    }
    return Promise.reject(error)
  }
  return Promise.reject(error)
})
export default instance
