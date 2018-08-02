import service from './axios'
// import querystring from 'querystring'

export function getAllUsers (user, pagenum, pagesize) {
  const url = `/user/list?pageNum=${pagenum}&pageSize=${pagesize}`
  const data = {
    user: user,
    pageNum: pagenum,
    pageSize: pagesize
  }
  return service.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addUser (user) {
  const url = '/user/add'
  return service.post(url, user).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function modifyUser (user) {
  const url = '/user/modify'
  return service.post(url, user).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updataPsd (psdinfo) {
  const url = '/user/upd-pwd'
  return service.get(url, {
    params: psdinfo
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 角色相关
export function getAllRoles () {
  const url = '/role/all'
  return service.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRoles (id) {
  const url = '/role/single'
  const data = {
    userId: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function setRoles (id, roleids) {
  const queryIds = roleids.map(x => '&roleIds=' + x).join('')
  const url = `/user-role/relation?userId=${id}${queryIds}`
  return service.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addRole (role) {
  const url = '/role/add'
  return service.post(url, role).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function modifyRole (role) {
  const url = '/role/edit'
  return service.post(url, role).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function deletRole (id) {
  const url = '/role/del'
  const data = {
    id: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
