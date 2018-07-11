export function getBase64 (url) {
  fetch(url).then(data => {
    const blob = data.blob()
    return blob
  }).then(blob => {
    let reader = new window.FileReader()
    reader.onloadend = function () {
      const data = reader.result
      return data
    }
    reader.readAsDataURL(blob)
  })
}
