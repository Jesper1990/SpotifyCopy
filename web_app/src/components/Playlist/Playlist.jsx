import React, { useState, useEffect } from 'react'
import './Playlist.css'

const Playlist = () => {
  // const [songId, setSongId] = useState('')
  const [userId, setUserId] = useState('')
  const [playlistname, setPlaylistName] = useState('')
  const [playlists, setPlaylists] = useState()

  useEffect(() => {
    whoAmI()
  }, [])

  useEffect(() => {
    showPlaylists()
  }, [])
 
  const createPlaylist = () => {
    let playlistName = playlistname
    let owner = userId
    let songIds = []

    const newPlaylist = { playlistName, owner, songIds }

    fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlaylist)
    }).then(() => {
      console.log(newPlaylist)
    })
    showPlaylists()
  }

  const showPlaylists = () => {
    fetch('/api/playlists')
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data)
      })
  }

   const whoAmI = () => {
    fetch('/api/whoami')
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id)
      })
  }

  return (
     <div>
        <input
          className="playlist-input"
          type="text" 
          placeholder="add new playlist"
          value={playlistname}
          onChange={e => setPlaylistName(e.target.value)}
        /> 
      <button className="playlist-btn" onClick={createPlaylist}>Add playlist</button>
      
      <div>       
        {playlists && playlists.filter(x => x.owner === userId).map((pl, i) => (
          <ul className="ul-list" key={i}>
            <li>{pl.playlistName}</li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default Playlist
