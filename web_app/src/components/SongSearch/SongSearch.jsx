import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoId } from '../../redux/ducks/videoId';
import Player from '../Player/Player';
import './SongSearch.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SongSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const [artists, setArtists] = useState()
  const [browseId, setBrowseId] = useState()

  const getSong = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/songs/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.content)
      })
  }
   const getArtist = () => {
     fetch(`https://yt-music-api.herokuapp.com/api/yt/search/${input}`)
       .then((res) => res.json())
       .then((data) => {
          setArtists(data.content)
         console.log(data.content)
         console.log(data.content[0].thumbnails[1].url)
       })
  }

  // const artistClick = (artist) => {
  //   setBrowseId(artist.browseId)
  //   console.log(browseId)
  // }

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
        
         <div>
          {artists && artists.map(artist => (
            <Link to ={`artist/${input}`}>
              <img src={artist.thumbnails.url}/>
              <p>{artist.browseId}</p>
              </Link>
          )) }         
        </div>  

        <div className="grid-container">
          {songs && songs.map(song => (
            <div className="grid-display">
              <div className="search-container" key={song.id} onClick={() => songClick(song)}>
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