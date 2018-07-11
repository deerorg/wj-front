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

export function addWj (wjinfor) {
  const url = '/paper/add'
  return service.post(url, wjinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deletWj (id, userid) {
  const url = '/paper/delete'
  const data = {
    id: id,
    createUser: userid
  }
  return service.delete(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function UpdateWj (wjinfor) {
  const url = '/paper/update'
  return service.put(url, wjinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getWjInfor (id, userid) {
  const url = '/paper/queryPaperInfo'
  const data = {
    createUser: userid,
    id: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addQuestion (queinfor) {
  const url = '/test/add'
  return service.post(url, queinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updataQuestion (queinfor) {
  const url = '/test/update'
  return service.put(url, queinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deleteQue (id, userid) {
  const url = '/test/delete'
  const data = {
    id: id,
    createUser: userid
  }
  return service.delete(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
