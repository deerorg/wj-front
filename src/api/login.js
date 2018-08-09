import service from './axios'
import querystring from 'querystring'
import md5 from 'md5'

export function Login (data) {
  const url = '/mblogin'
  data.pwd = md5(data.pwd)
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

export function logout (id) {
  const url = '/logout'
  const data = {
    uid: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
