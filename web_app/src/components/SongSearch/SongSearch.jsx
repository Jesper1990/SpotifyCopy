import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoId } from '../../redux/ducks/videoId';
import Player from '../Player/Player';
import './SongSearch.css'

const SongSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const [artists, setArtists] = useState()

  const getSong = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/songs/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.content)
        console.log(data.content);
      })
  }
  const getArtist = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/artists/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.content[0])
        console.log(data.content[0])
      })
   }

  const songClick = (song) => {
    dispatch(setVideoId(song.videoId))
    console.log(song.artist.name);
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      getSong()
    }
  }
  const handleArtistKeypress = (e) => {
    if (e.key === 'Enter') {
      getArtist()
    }
  }
  return (
    <div className="search-main">
      <div>
        <input
          className="search-field"
          type="text"
          placeholder="search songs"
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button className="btn-search" onClick={getSong}>
          Search
        </button>
        <input
          className="search-field"
          type="text"
          placeholder="search artists"
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleArtistKeypress}
        />
        <button className="btn-search" onClick={getArtist}>
          Search
        </button>
        <hr />
        {artists ? <img src={artists.thumbnails[1].url} /> : '' }
        {/* <div>
          {artists && artists.map(artist => (
            <img src={artist.thumbnails[1].url} />
          )) }         
        </div> */}
        
        <div className="grid-container">
        {songs && songs.map(song => (
          <div className="grid-display">
            <div className="search-container" key={song.id}  onClick={() => songClick(song)}>
              <img className="search-img" src={song.thumbnails[0].url} />
                <div className="search-name">
                  <h4>{song.artist.name}</h4>
                  <p>{song.name}</p>
                </div>
            </div>
          </div>
          
        ))}
          </div>
      </div>
      <Player />
    </div>
   );
}
 
export default SongSearch;