export function getBase64 (url) {
  fetch(url).then(data => {
<<<<<<< HEAD
    let blob = data.blob()
=======
    const blob = data.blob()
>>>>>>> ddcd95ee518365bf882acfd295b88ccc225c0fd4
    return blob
  }).then(blob => {
    let reader = new window.FileReader()
    reader.onloadend = function () {
<<<<<<< HEAD
    // reader.result
=======
      const data = reader.result
      return data
>>>>>>> ddcd95ee518365bf882acfd295b88ccc225c0fd4
    }
    reader.readAsDataURL(blob)
  })
}
