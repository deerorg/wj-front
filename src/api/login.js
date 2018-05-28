import axios from 'axios'

export function Login (data) {
  const url = 'api/login'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function checkLoginState () {
  const url = 'api/checklogin'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
