export function getBase64 (url) {
  fetch(url).then(data => {
    let blob = data.blob()
    return blob
  }).then(blob => {
    let reader = new window.FileReader()
    reader.onloadend = function () {
    // reader.result
    }
    reader.readAsDataURL(blob)
  })
}
