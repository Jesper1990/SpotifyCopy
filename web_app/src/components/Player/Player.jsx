import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 
// TODO: Updatera spellistan så den kan starta från index inte från början!

const Player = () => {
  // State på 1 specifikt ID som skickas via onClick i sökfunktionen.
  const videoId = useSelector(state => state.videoId.videoId)

  // State på en Array utav ID:s som skickas via onClick i sökfunktionen, skall separeras för bättre funktionalitet.
  const videoPlaylist = useSelector(state => state.videoPlaylist.videoPlaylist)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    loadPlayer()
  }, [])

  // Startar spelaren med det specifika ID:t för låten man har klickat på.
  useEffect(() => {
    if (videoId) {
      startSong(videoId)
    }
  }, [videoId])

  // Ej fullt funktionell då den nu alltid startar på första ID:t även om man klickar på någon annan.
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
  // Funktion för att ladda spelaren med en spellista (en array utav ID:s som skickas via store.)
  const startPlaylist = () => {    
    player.loadPlaylist(videoPlaylist)
  }
  // Funktion för att ändra toggle på "Play / Pause" ikonerna
  const playSong = () => {
    if (!isActive) {
      setIsActive(true)
      player.playVideo()
    } else {
      setIsActive(false)
      player.pauseVideo()
    }
  }
  // Funktion för knappen "Next"
  const nextSong = () => {
    player.nextVideo()
  }
  // Funktion för knappen "Previous"
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
          {/* Toggle funktion för att ändra display på ikoner. ? = True, : = False. "Play" är default eftersom useState är satt till false default.  */}  
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
