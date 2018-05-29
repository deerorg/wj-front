import axios from 'axios'
import querystring from 'querystring'

export function Login (data) {
  const url = 'http://39.108.55.120:8089/api/mblogin'
  return axios.post(url, querystring.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}

// export function checkLoginState () {
//   const url = 'api/checklogin'
//   return axios.get(url).then((res) => {
//     return Promise.resolve(res)
//   })
// }
