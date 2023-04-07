const express = require('express')
const app = express()
const port = 3000

// Imports album model
const AlbumModel = require('./models/albumModel')

const password = 'ixR3RN7ZL2b9nlN7'

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = `mongodb+srv://user:${password}@fullstacklab1.qrmbdib.mongodb.net/?retryWrites=true&w=majority`

main().catch(err => console.log(err))
async function main() {
  await mongoose.connect(mongoDB)
}

// Will log if the database is connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
})

app.listen(port, () => {
  console.log('Server is listening on port: ' + port)
})

app.get('/', async function (req, res) {
  console.log(await AlbumModel.find())
  res.json('The server is up!')
})