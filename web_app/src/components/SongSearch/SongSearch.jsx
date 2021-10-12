import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setVideoPlaylist } from '../../redux/ducks/videoPlaylist';
import { setVideoId } from '../../redux/ducks/videoId';
import './SongSearch.css'
import { Link } from "react-router-dom";
import { setVideoSongQueue } from '../../redux/ducks/videoSongQueue';
import { setVideoIndex } from '../../redux/ducks/videoIndex';

const SongSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const [playlist, setPlaylist] = useState([])
  const playlistId = [];
  const [artists, setArtists] = useState()

  const getSong = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/songs/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.content)
        data.content.forEach(element => playlistId.push(element.videoId))
        setPlaylist(playlistId)
        
      })
  }

  const getArtist = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/search/${input}`)
      .then((res) => res.json())
      .then((data) => {
        const [artist] = data.content.filter(d => (d.type === "artist"))
        setArtists([artist])
      })
  }

  /* onClick function   
      1. setVideoId to the player to play the correct song
      2. setVideoIndex to get the index of the currently playing song.
      3. setVideoSongQueue to get the entire songs object to track index in the player.
  */
  const songClick = (song, i) => {
    dispatch(setVideoId(song.videoId))
    dispatch(setVideoIndex(i))
    dispatch(setVideoSongQueue(songs))
  }

  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      getSong()
      getArtist()
    }
  }

  const buttonClick = () => {
    getSong()
    getArtist()
  }

  return (
    <div className="search-main">
      <div>
        <div className="search-div">
        <input
          className="search-field"
          type="text"
          placeholder="search songs"
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeypress}
        />
        </div>

          {artists && artists.map(artist => (

            <div className="search-result" key={artist.browseId}>
              <Link to={`artist/${artist.browseId}`} className="artist-link">
                <div className="artist-container">
                <img src={artist.thumbnails[1]?.url} className="artist-image" />
                <div className="artist-text">
                  <h4 className="artist-h4">{artist.name}</h4>
                </div>
                </div>
              </Link>
            </div>
          ))}


        <div className="grid-container">
          {/* <button onClick={testFunktion}>Test next</button> */}
          {songs && songs.map((song, i) => (
            <div className="grid-display" key={song.videoId}>
              <div className="search-container" onClick={() => songClick(song, i)}>
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
    </div>
  );
}

export default SongSearch;