export function getUserAgent () {
  let ua = navigator.userAgent
  if (/Android|ios|Mobile|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|MQQBrowser|MicroMessenger/i.test(ua)) {
    if (/MQQBrowser/i.test(ua)) {
      return '2' // qq
    } else if (/MicroMessenger/i.test(ua)) {
      return '1' // 微信
    } else {
      return '9' // 其他
    }
  } else return '3' // pc
}
