import service from './axios'
import querystring from 'querystring'

export function Login (data) {
  const url = '/mblogin'
  return service.post(url, querystring.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function checkLoginState () {
  const url = '/checkUserOnline'
  return service.get(url).then((res) => {
    return Promise.resolve(res)
  })
}
