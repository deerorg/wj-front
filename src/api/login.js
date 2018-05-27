import axios from 'axios'
// import jsonp from 'common/js/jsonp'
// import {options} from './config'

export function Login (data) {
  const url = 'api/login'
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
