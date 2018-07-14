import service from './axios'

export function getKaptchaImage (phone) {
  const url = '/image/getKaptchaImage'
  const data = {
    phone: phone
  }
  return service.get(url, {
    params: data,
    responseType: 'arraybuffer' // !!!
  }).then((res) => {
    return 'data:image/png;base64,' + btoa(
      new Uint8Array(res.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  }).then(data => {
    return Promise.resolve(data)
  })
}

export function check (checkname, val) {
  const url = '/sys/register/check'
  const data = {
    checkName: checkname,
    checkValue: val
  }
  return service.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function register (userinfor) {
  const url = '/sys/register/add'
  return service.post(url, userinfor).then((res) => {
    return Promise.resolve(res.data)
  })
}
