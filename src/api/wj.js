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

export function addOption (optioninfor) {
  const url = '/option/add'
  return service.post(url, optioninfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updataOption (optioninfor) {
  const url = '/option/update'
  return service.put(url, optioninfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deletOp (id, userid) {
  const url = '/option/delete'
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

export function addQuewithOptions (queinfor) {
  const url = '/test/add/contains/options'
  return service.post(url, queinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updateQuewithOptions (queinfor) {
  const url = '/test/update/insert/contains/options'
  return service.post(url, queinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function imgUpload (id, imgbase64) {
  const url = '/img/upload'
  const data = {
    createUser: id,
    imgBase64: imgbase64
  }
  return service.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
