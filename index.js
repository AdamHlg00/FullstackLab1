const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT

// Imports album model
const AlbumModel = require('./models/albumModel')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = process.env.ACCESS_STRING

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