const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.json())
app.use(cors({
  origin: "*",
}))

// Imports album model
const AlbumModel = require('./models/albumModel')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = process.env.ACCESS_STRING

// Connects the database
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

// Default route
app.get('/', async function (req, res) {
})

// Route to get and display all albums
app.get('/api/albums', async function (req, res) {
  // Gets all albums
  let albums = await AlbumModel.find()
  res.json(albums)
})

// Route for getting and displaying a specific album
app.get('/api/albums/:title', async function (req, res) {
  let title = req.params.title
  // Gets an album using title
  let album = await AlbumModel.find({ title: `${title}` })

  // If album title isn't found, send error status
  if (album != '') {
    console.log(album)
    res.send(album)
  } else {
    res.status(404).send('Album not found')
  }
})

// Route for adding an album
app.post('/api/albums', async function (req, res) {
  let id = req.body.id
  let title = req.body.title
  let artist = req.body.artist
  let year = req.body.year

  // Finds an album by id
  let album = await AlbumModel.findById(id)

  // If the id is occupied, send error
  if (album = '') {
    // Finds album by title, artist, and year
    album = await AlbumModel.find({ title: `${title}` }, { artist: `${artist}` }, { year: `${year}` })
    // If the album already exist, send error
    if (album = '') {
      const newAlbum = new AlbumModel({
        _id: `${id}`,
        title: `${title}`,
        artist: `${artist}`,
        year: `${year}`,
      })

      // Adds new album to the database
      newAlbum.save((err, res) => {
        if (err) {
          res.status(500).send('Error!')
        } else {
          res.status(201).send(newAlbum)
        }
      })
    } else {
      res.status(409).send('Album already exist in database!')
    }
  } else {
    res.status(409).send('Id already exist!')
  }
})

// Route for updating an album
app.put('/api/albums/:id', async function (req, res) {
  let id = req.body.id
})