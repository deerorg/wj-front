import Cookies from 'js-cookie'
import bus from './bus'

export function setName (name) {
  bus.user.name = name
  Cookies.set('name', name)
}
export function setToken (token) {
  bus.user.token = token
  Cookies.set('token', token)
}

export function setId (id) {
  bus.user.id = id
  Cookies.set('id', id)
}

export function getName () {
  return bus.user.name ? bus.user.name : Cookies.get('name')
}

export function getToken () {
  return bus.user.token ? bus.user.token : Cookies.get('token')
}

export function getId () {
  return bus.user.id ? bus.user.id : Cookies.get('id')
}

export function getRoleId () {
  let user = JSON.parse(localStorage.getItem('userinfor'))
  return user.roleIds //  it is an array
}

export function deleName () {
  bus.user.name = ''
  Cookies.remove('name')
}

export function deleToken () {
  bus.user.token = ''
  Cookies.remove('token')
}

export function deleId () {
  bus.user.id = ''
  Cookies.remove('id')
}

export function storeUserInfor (infor) {
  localStorage.setItem('userinfor', JSON.stringify(infor))
}

export function getUserInfor () {
  return JSON.parse(localStorage.getItem('userinfor'))
}

export function setUser (name, token, id) {
  setName(name)
  setToken(token)
  setId(id)
}

export function deleUser () {
  deleName()
  deleToken()
  deleId()
}

export function getIdfromUrl () {
  let url = window.location.href
  if (url.indexOf('=') > 0) {
    return decodeURI((url.split(/[:?]/))[url.split(/[:?]/).length - 2])
  } else if (url.indexOf('=') < 0) {
    return decodeURI((url.split(':'))[url.split(':').length - 1])
  } else {
    return ''
  }
}

export function getCreatUserId () {
  let url = window.location.href
  if (url.indexOf('=') > 0) {
    return decodeURI((url.split('='))[url.split('=').length - 1])
  } else { return '' }
}
// 设置cookie,登录名 name, id, token,（分开）
// 删除cookie,登录名 name, id, token

// 设置localstorage试卷id, 状态status
// 删除localstorage试卷id, 状态status
