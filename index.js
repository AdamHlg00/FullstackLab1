const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})

app.get('/', function (req, res) {
  res.json('The server is up!')
})