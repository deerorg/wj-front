var express = require('express')
var config = require('./config/index')
var app = express()

var apiRouters = express.Router()
app.use('/api', apiRouters)

app.use(express.static('./dist'))

var port = process.env.PORT || config.dev.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http:localhost:' + port)
})
