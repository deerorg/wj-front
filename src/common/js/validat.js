export const REG = {
  PSD: new RegExp(/^([-_a-zA-Z0-9]{6,20})$/), // 有效密码:6-20位字母，数字，减号，下划线
  NAME: new RegExp(/^([-_a-zA-Z0-9]{4,20})$/)
}
