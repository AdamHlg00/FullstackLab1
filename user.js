const getAlbumsButton = document.getElementById('getAlbumsButton')
const addButton = document.getElementById('addButton')

addButton.addEventListener('click', async event => {
  const albumData = {
    id: id.value,
    title: title.value,
    artist: artist.value,
    year: year.value
  }

  const albumDataJSON = JSON.stringify(albumData)

  let data = await addAlbum(albumDataJSON)
  console.log(data)
  if (data === 'Id already exist!' || data === 'Album already exist in database!') {
    return
  } else {
    document.getElementById('addedAlbum').innerHTML = data.title + ' added! Page reload commencing..'

    setTimeout(() => { location.reload() }, 2000)
  }
})

// Takes care of displaying all albums
async function displayAlbums() {
  let data = await getAlbums()

  // Takes the table from index.html
  const tableBody = document.getElementById('showAlbums')

  // Creates new table row for each album
  data.forEach(album => {
    const row = document.createElement('tr')

    // Cell for album id
    let idCell = document.createElement('td')
    idCell.textContent = album._id
    row.appendChild(idCell)

    // Cell for album title
    let titleCell = document.createElement('td')
    titleCell.textContent = album.title
    row.appendChild(titleCell)

    // Cell for album artist
    let artistCell = document.createElement('td')
    artistCell.textContent = album.artist
    row.appendChild(artistCell)

    // Cell for album year
    let yearCell = document.createElement('td')
    yearCell.textContent = album.year
    row.appendChild(yearCell)

    tableBody.appendChild(row)
  })
}

window.addEventListener('load', displayAlbums)

// Gets all albums from the API using fetch
async function getAlbums() {
  try {
    let result = await fetch('http://localhost:3000/api/albums', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
    let rest = await result.json()
    return rest
  } catch (error) {
    console.log(error)
  }
}

async function addAlbum(albumData) {
  try {
    let result = await fetch('http://localhost:3000/api/albums', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: albumData
    })
    let rest = await result.json()
    return rest
  } catch (error) {
    console.log(error)
  }
}