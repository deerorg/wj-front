import service from './axios'
// import querystring from 'querystring'

export function updataPsd (oldPwd, newPwd, id) {
  const url = '/user/upd-pwd'
  const data = {
    oldPwd: oldPwd,
    newPwd: newPwd,
    uid: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updataInfor (infor) {
  const url = '/user/modify'
  return service.post(url, infor).then((res) => {
    return Promise.resolve(res.data) // 这里貌似后端有错误500
  })
}
