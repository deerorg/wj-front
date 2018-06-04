import axios from 'axios'
import URLConfig from './config'
import { getToken, deleUser } from 'store/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: URLConfig.BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  config.headers['E-User-Token'] = getToken()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response && response.data != null) {
      if (response.data.success && response.data.data === 'REPEAT_LOGIN') {
        Message({
          message: '异地登录,请重新登录 ',
          type: 'error',
          duration: 2 * 1000
        })
        localStorage.clear()
        deleUser()
        window.router.push('/login')
      }
    }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    if (error.message && error.message === 'Network Error') {
      error.message = ' 网络异常, 请稍后重试 '
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    } else if (error.response && error.response.status === 500 &&
        (error.response.data.message === 'LOGOUT' || error.response.data.message === 'TOKEN_ERROR')) {
      localStorage.clear()
      deleUser()
      Message({
        message: '用户已退出, 请重新登录',
        type: 'error',
        duration: 3 * 1000
      })
      window.router.push('/login')
    } else if (error.response && error.response.status === 200 && error.response.data === 'FORCE_LOGIN') { // api 接口 或返回 ReLogin的处理 用户强制退出
      localStorage.clear()
      deleUser()
      window.router.push('/login')
    } else if (error.message) {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
