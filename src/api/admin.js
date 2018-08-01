import service from './axios'
import querystring from 'querystring'

export function getAllUsers (user, pagenum, pagesize) {
  const url = '/user/list'
  const data = {
    user: user,
    pageNum: pagenum,
    pageSize: pagesize
  }
  return service.post(url, querystring.stringify(data)).then((res) => {
    return Promise.resolve(res.data)
  })
}
