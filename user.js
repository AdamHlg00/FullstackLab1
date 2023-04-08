let getAlbumsButton = document.getElementById('getAlbumsButton')

// Takes care of displaying all albums
getAlbumsButton.addEventListener('click', async event => {
  let data = await getAlbums()
  console.log(data)

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
})

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