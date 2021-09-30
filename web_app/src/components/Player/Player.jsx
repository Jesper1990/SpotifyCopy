import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 
// TODO: Updatera spellistan så den kan starta från index inte från början!

const Player = () => {
  const videoId = useSelector(state => state.videoId.videoId)
  const videoPlaylist = useSelector(state => state.videoPlaylist.videoPlaylist)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    loadPlayer()
  }, [])

  useEffect(() => {
    if (videoId) {
      startSong(videoId)
    }
  }, [videoId])

  useEffect(() => {
    if (videoPlaylist) {
      startPlaylist(videoPlaylist)
    }
  }, [videoPlaylist])

  const loadPlayer = () => {
    let ytPlayer = new YT.Player('yt-player', {
      height: '0',
      width: '0',
      events: {
        'onStateChange': onPlayerStateChange
      }
    })
    setPlayer(ytPlayer)
  }

  const onPlayerStateChange = (event) => {
    if (event.data != YT.PlayerState.PLAYING) return
  }
  
  const startSong = () => {
    player.loadVideoById(videoId)
  }
  const startPlaylist = () => {    
    player.loadPlaylist(videoPlaylist)
  }

  const playSong = () => {
    if (!isActive) {
      setIsActive(true)
      player.playVideo()
    } else {
      setIsActive(false)
      player.pauseVideo()
    }
  }
  const nextSong = () => {
    player.nextVideo()
  }
  const previousSong = () => {
    player.previousVideo()
  }

  return (
    <div className="music-sticky">
      <div id="yt-player"></div>
      <div className="buttons">
        <ul className="list-buttons">
          <li className="list-link" onClick={previousSong}>
           
              <FontAwesomeIcon className="fa-icon" icon={faBackward} />
            
          </li>
          <li className="list-play-pause" onClick={playSong}>
            
              {isActive ? <FontAwesomeIcon className="play-pause" icon={faPause}/> : <FontAwesomeIcon className="play-pause" icon={faPlay} /> }
            
          </li>
          <li className="list-link" onClick={nextSong}>         
             
              <FontAwesomeIcon className="fa-icon" icon={faForward} />
            
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Player;
