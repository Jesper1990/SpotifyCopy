import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoId } from '../../redux/ducks/videoId';
import Player from '../Player/Player';

const PlayerSearch = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()

  const searchSong = () => {
    fetch(`https://yt-music-api.herokuapp.com/api/yt/songs/${input}`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.content)
      })
  }

  const songClick = (song) => {
    dispatch(setVideoId(song.videoId))
  }

  return (
    <div>
      <Player />
      <div>
        <input
          type="text"
          placeholder="search songs"
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={searchSong}>Search</button>
        <hr />
        {songs && songs.map(song => (
          <ul key={song.id}>
            <li onClick={() => songClick(song)}>{song.name}</li>
          </ul>
        ))}
      </div>
    </div>
   );
}
 
export default PlayerSearch;