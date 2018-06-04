import service from './axios'

export function getWjList (pagenum, id, query, pagesize) {
  const url = '/paper/listByPage'
  const data = {
    createUser: id,
    queryLike: query,
    pageNum: pagenum,
    pageSize: pagesize
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
