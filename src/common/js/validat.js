export const REG = {
  PSD: new RegExp(/^([-_a-zA-Z0-9]{6,20})$/), // 有效密码:6-20位字母，数字，减号，下划线
  NAME: new RegExp(/^([-_a-zA-Z0-9]{4,20})$/),
  EMAILE: new RegExp(/.+@.+\.[a-zA-Z]{2,4}$/),
  MOBILE: new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/)
}

export function fliter (value) {
  value = value.replace(/[<>]/g, function (c) { return {'<': '&lt', '>': '&gt'}[c] })
  value = value.replace(/[\s\r\n]/g, '')
  return value
}
