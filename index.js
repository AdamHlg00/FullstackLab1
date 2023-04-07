const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const port = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.json())

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
  let allAlbums = await AlbumModel.find()
  res.render('index.ejs', { albums: allAlbums })
})