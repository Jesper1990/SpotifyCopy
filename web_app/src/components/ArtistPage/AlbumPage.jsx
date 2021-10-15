import { faAngleLeft, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { setVideoId } from '../../redux/ducks/videoId'
import { setVideoPlaylist } from '../../redux/ducks/videoPlaylist'
import './AlbumPage.css'

const AlbumPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [albums, setAlbums] = useState()
  const playlistArray = []
  let { browseid } = useParams()

    useEffect(() => {
    let canceled = false

    if (!browseid) {
      return
    }
    fetch(`https://yt-music-api.herokuapp.com/api/yt/album/${browseid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          setAlbums(data)
          console.log(data);
        }
      })

    return () => {
      canceled = true
    }
    }, [])
  
  const setTest = (album, i) => {
    dispatch(setVideoId(album.videoId))
  }
  
  const goBack = () => {
    history.goBack()
  }
  const testFunction = () => {
    albums.tracks.forEach(e => playlistArray.push(e.videoId))
    dispatch(setVideoPlaylist(playlistArray))
  }
  return (
    <div>
      <div>
        <button onClick={ goBack } className="go-back">
        <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
      </div>
      {albums ? 
      <div className="albumpage-pic">
        <img src={albums.thumbnails[2].url} />
        <div className="start-playlist-div">
            <button className="start-playlist" onClick={testFunction}>Start playlist</button>
        </div>
      </div>
        
      : 
      <div>
        <h4>Could not load image</h4>
      </div>
      }
      
      <div className="map-div">
      {albums && albums.tracks.map((album, i) => (
        <div className="grid-albumpage">
          <div className="albumpage-name">
            <h4>{album.name}</h4>
            <p>{albums.artist[0].name}</p>
          </div>
          <div className="albumpage-fa">
            <FontAwesomeIcon icon={faPlay}
              className="albumpage-play"
              onClick={() => setTest(album)}
            />
          </div>
        </div>
      ))}
      </div>
    </div>
   );
}
 
export default AlbumPage;