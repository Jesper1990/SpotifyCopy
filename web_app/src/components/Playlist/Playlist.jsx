import React, { useState, useEffect } from 'react'

function Playlist() {

const [songId, setSongId] = useState('')

const [userId, setUserId] = useState('')

const [playlistname, setPlaylistName] = useState('')

const [playlists, setPlaylists] = useState()

useEffect(() => {
    whoAmI()
  }, [])

  useEffect(() => {
    showPlaylists()
  }, [])
 
async function createPlaylist() {

let playlistName = playlistname
let owner = userId
let songIds = []

const newPlaylist = { playlistName, owner, songIds }

console.log(newPlaylist)

fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaylist)
    }).then(() => {
      console.log(newPlaylist)
    })
}

function addSongToPlaylist () {

}

async function showPlaylists () {
    
    const plresponse = await fetch("http://localhost:4000/api/playlists", {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      const plresp = await plresponse.json();
      console.log(plresp)
      setPlaylists(plresp)
      console.log(playlists)
      playlists.forEach(x => console.log(x))
}

async function whoAmI() {
    let loggedInUser=null
    let response = await fetch('/api/whoami')
    try {
      loggedInUser = await response.json()
      setUserId(loggedInUser.id)
      console.log(userId)
    }
    catch {
      console.log('Not logged in')
    }
  }

    return (
            <div>
             <input 
             type="text" 
             placeholder="add new playlist"
             value={playlistname}
             onChange={e => setPlaylistName(e.target.value)}
              /> 
    
             <button onClick={createPlaylist}>Add playlist</button>
            

            <div>
                
            {playlists && playlists.filter(x => x.owner === userId).map((pl,i) => (
                    <p>{pl.playlistName}</p>
                ))}
            </div>
            </div>
        )
}

export default Playlist
