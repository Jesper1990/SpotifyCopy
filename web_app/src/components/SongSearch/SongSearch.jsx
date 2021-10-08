import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setVideoPlaylist } from '../../redux/ducks/videoPlaylist';
import { setVideoId } from '../../redux/ducks/videoId';
import './SongSearch.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const SongSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const [playlist, setPlaylist] = useState([])
  const playlistId = [];
  const [artists, setArtists] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoPlayer = useSelector(state => state.videoPlayer.videoPlayer)
 

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
        //  console.log(artist)
       })
  }

// currentSongIndex state on clicked index
// ignore videoPlaylist
// when nextbutton is clicked, retrieve new videoId from index.
  const songClick = (song, i) => {
    dispatch(setVideoId(song.videoId))
    setCurrentIndex(i)  
    // dispatch(setVideoPlaylist(playlist))
    console.log(`${song.videoId} : ${i}`)
    songs.forEach((value, index) => dispatch(setVideoId(value.videoId), setCurrentIndex(index)))
    // console.log(videoPlayer);
    // playlist.forEach((value, index) => console.log(`${index} : ${value}`))
    console.log(currentIndex);
  }

  const testNext = () => {
    // videoPlayer.nextVideo()
    console.log(videoPlayer);
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
        <input
          className="search-field"
          type="text"
          placeholder="search songs"
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button className="btn-search" onClick={buttonClick}>
          Search
        </button>
        <hr />
        
         <div>
          {artists && artists.map(artist => (
            
            <div className="search-result">
              <Link to={`artist/${artist.browseId}`}>
                <img src={artist.thumbnails[0]?.url} /> 
              </Link>
            </div>
            
          )) }
        </div>  

        <div className="grid-container">
          <button onClick={testNext}>Test next</button>
          {songs && songs.map((song, i) => (
            <div className="grid-display">
              <div className="search-container" key={song.id} onClick={() => songClick(song, i)}>
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