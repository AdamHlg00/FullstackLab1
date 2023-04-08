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
    document.getElementById('albumInfo').innerHTML = data.title + ' added! Page reload commencing..'

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

    // Cell for delete button
    let deleteButtonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'

    // Event handler for delete button
    deleteButton.addEventListener('click', async () => {
      // Removes delete button so it can be replaced by confirm/cancel
      deleteButtonCell.removeChild(deleteButton)

      let confirmDeleteButton = document.createElement('button')
      confirmDeleteButton.textContent = 'Confirm'

      // Adds confirmation button to the cell
      deleteButtonCell.appendChild(confirmDeleteButton)

      // Event handler for confirming deletion
      confirmDeleteButton.addEventListener('click', async () => {
        const albumId = {
          id: album._id
        }

        const albumIdJSON = JSON.stringify(albumId)
        let idData = await deleteAlbum(albumIdJSON)

        document.getElementById('albumInfo').innerHTML = idData.title + ' deleted! Page reload commencing..'
        setTimeout(() => { location.reload() }, 2000)
      })

      let cancelDeleteButton = document.createElement('button')
      cancelDeleteButton.textContent = 'Cancel'

      // Adds cancelation button to the cell
      deleteButtonCell.appendChild(cancelDeleteButton)

      // Event handler for canceling deletion
      cancelDeleteButton.addEventListener('click', async () => {
        // Replaces confirm/cancel with the original delete button
        deleteButtonCell.removeChild(confirmDeleteButton)
        deleteButtonCell.removeChild(cancelDeleteButton)
        deleteButtonCell.appendChild(deleteButton)
      })
    })

    deleteButtonCell.appendChild(deleteButton)
    row.appendChild(deleteButtonCell)

    // Cell for update button
    let updateButtonCell = document.createElement('td')
    let updateButton = document.createElement('button')
    updateButton.textContent = 'Update'
    updateButton.addEventListener('click', async () => {
      const albumData = {
        id: album._id
      }

      const albumDataJSON = JSON.stringify(albumData)
      let data = await deleteAlbum(albumDataJSON)

      document.getElementById('albumInfo').innerHTML = data.title + ' updated! Page reload commencing..'
      setTimeout(() => { location.reload() }, 2000)
    })

    updateButtonCell.appendChild(updateButton)
    row.appendChild(updateButtonCell)

    // Appends the row to the table
    tableBody.appendChild(row)
  })
}

window.addEventListener('load', displayAlbums)

// Fetch for deleting an album
async function deleteAlbum(albumData) {
  try {
    let result = await fetch('http://localhost:3000/api/albums/:id', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: albumData
    })
    let rest = await result.json()
    return rest
  } catch (error) {
    console.log(error)
  }
}

// Fetch for getting all albums
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

// Fetch for adding an album
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