import service from './axios'
// import axios from 'axios'
// import URLConfig from './config'
// import { getToken } from 'store/store'
// const tempservice = axios.create({
//   baseURL: URLConfig.BASE_API,
//   timeout: 5000,
//   headers: {'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'}
// })

// tempservice.interceptors.request.use(config => {
//   config.headers['E-User-Token'] = getToken()
//   return config
// }, error => {
//   Promise.reject(error)
// })
export function getKaptchaImage (phone) {
  const url = '/image/getKaptchaImage'
  const data = {
    phone: phone
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  })
}
