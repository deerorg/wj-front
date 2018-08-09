import service from './axios'
import querystring from 'querystring'
import URLConfig from './config'
import { getToken } from 'store/store'
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

export function UpdateWjStatus (wjinfor) {
  const url = '/paper/update/status'
  return service.put(url, querystring.stringify(wjinfor)).then((res) => {
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

export function imgDownload (id, imgurl) {
  const url = '/img/download'
  const data = {
    createUser: id,
    url: imgurl
  }
  // return service.post(url, querystring.stringify(data)).then((res) => {
  //   if (res.data.success) {
  //     return Promise.resolve(res.data.data) // 直接返回base64
  //   } else {
  //     return Promise.reject(console.error('cannot download the img')
  //     )
  //   }
  // })
  const xhr = new XMLHttpRequest()
  xhr.open('post', URLConfig.BASE_API + url)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('E-User-Token', getToken())
  xhr.send(querystring.stringify(data))
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let res = JSON.parse(xhr.responseText)
      //  console.log(res.data)
      return res.data
    }
  }
}

export function submitWj (answerinfor) {
  const url = '/userpaper/add'
  return service.post(url, answerinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getAnswerCount (id) {
  const url = '/userpaper/count/ids'
  const data = {
    paperId: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getAnswerWjList (id, pagenum, pagesize) {
  const url = '/userpaper/listByPage'
  const data = {
    paperId: id,
    pageNum: pagenum,
    pageSize: pagesize
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getAnswerDtail (id) {
  const url = '/userpaper/query/userpaper'
  const data = {
    userPaperId: id
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getAnswerReport (pid, uid) {
  const url = '/rp/list'
  const data = {
    paperId: pid,
    createUser: uid
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
