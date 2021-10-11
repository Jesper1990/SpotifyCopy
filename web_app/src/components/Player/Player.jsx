import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPause, faPlay, faStepBackward, faStepForward, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setVideoPlayer } from '../../redux/ducks/videoPlayer';
import Progressbar from '../Player/progressBar'
import { setVideoIndex } from '../../redux/ducks/videoIndex';
import { setVideoId } from '../../redux/ducks/videoId';

// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 
// TODO: Updatera spellistan så den kan starta från index inte från början!

const Player = () => {
  const dispatch = useDispatch()
  // State på 1 specifikt ID som skickas via onClick i sökfunktionen.
  const videoId = useSelector(state => state.videoId.videoId)
  // State på en Array utav ID:s som skickas via onClick i sökfunktionen, skall separeras för bättre funktionalitet.
  const videoPlaylist = useSelector(state => state.videoPlaylist.videoPlaylist)
  const videoIndex = useSelector(state => state.videoIndex.videoIndex)
  const videoSongQueue = useSelector (state => state.videoSongQueue.videoSongQueue)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    loadPlayer()
  }, [])

  // Startar spelaren med det specifika ID:t för låten man har klickat på.
  useEffect(() => {
    if (videoId) {
      startSong()
      // Kallar på toggle-funktionen för play-pause knappen för att aktiveras när spelaren är aktiv.
      playSong()
    }
  }, [videoId])

  // Ej fullt funktionell då den nu alltid startar på första ID:t även om man klickar på någon annan.
  // useEffect(() => {
  //   if (videoPlaylist) {
  //     startPlaylist(videoPlaylist)
  //     // Kallar på toggle-funktionen för play-pause knappen för att aktiveras när spelaren är aktiv.
  //     playSong()
  //   }
  // }, [videoPlaylist])

  const loadPlayer = () => {
    let ytPlayer = new YT.Player('yt-player', {
      height: '0',
      width: '0',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      }
    })
    setPlayer(ytPlayer)
    dispatch(setVideoPlayer(ytPlayer))
  }

  const onPlayerStateChange = (event) => {
    if (event.data != YT.PlayerState.PLAYING) {
      return
    }
  }
  const onPlayerReady = (event) => {
    if (event.data == YT.PlayerState.PLAYING) {
      setVolume(event.target)
      seekTo(event.target, true)
    }
  }
  const startSong = () => {
    player.loadVideoById(videoId)
  }
  // Funktion för att ladda spelaren med en spellista (en array utav ID:s som skickas via store.)
  const startPlaylist = () => {
    player.loadPlaylist(videoPlaylist, player.getPlaylistIndex())
    console.log(player.loadPlaylist());
  }

  // Funktion för att ändra toggle på "Play / Pause" ikonerna
  const playSong = () => {
    if (player.getPlayerState() != 1) {
      setIsActive(true)
      player.playVideo()
    } if (player.getPlayerState() == 1) {
      setIsActive(false)
      player.pauseVideo()
    }
  }
  // Funktion för knappen "Next"
  const nextSong = () => {
    if (videoIndex < videoSongQueue.length) {
      const nextSong = videoSongQueue[videoIndex + 1]
      dispatch(setVideoIndex(videoIndex + 1))
      dispatch(setVideoId(nextSong.videoId))
    }
  }
  // Funktion för knappen "Previous"
  const previousSong = () => {
    if (videoIndex > 0) {
      const nextSong = videoSongQueue[videoIndex - 1]
      dispatch(setVideoIndex(videoIndex - 1))
      dispatch(setVideoId(nextSong.videoId))
    }
  }

  return (
    <div className="music-sticky">         
      <div className="buttons">
        <div id="yt-player"></div>
        <div className="player-container">
          {videoSongQueue ? 
            <div className="display-player">
              <img src={videoSongQueue[videoIndex].thumbnails[0].url} className="player-image" />
              <div className="player-name">
                <h4 className="player-artist">{videoSongQueue[videoIndex].artist.name}</h4>
                <p className="player-song">{videoSongQueue[videoIndex].name}</p>                
              </div>
            </div>
            :
            <div />
          }
        </div>
        <div className="controls">
          <ul className="list-buttons">     
            <li className="list-link" onClick={previousSong}>
              <FontAwesomeIcon className="fa-icon" icon={faStepBackward} />
            </li>
            <li className="list-play-pause" onClick={playSong}>
              {/* Toggle funktion för att ändra display på ikoner. ? = True, : = False. "Play" är default eftersom useState är satt till false default.  */}
              {isActive ? <FontAwesomeIcon className="play-pause" icon={faPause} /> : <FontAwesomeIcon className="play-pause" icon={faPlay} />}
            </li>
            <li className="list-link" onClick={nextSong}>
              <FontAwesomeIcon className="fa-icon" icon={faStepForward} />
            </li>
          </ul>
        </div>
        <div className="volume-slider">
                   
              <input
              className="volume-bar"
              type="range"
              min="0"
              max="100"
              onChange={(e) => player.setVolume(e.target.value)}
          />
          <span><FontAwesomeIcon className="fa-icon-volume" icon={faVolumeUp} /></span>
            {/* <span><FontAwesomeIcon className="fa-icon-volume" icon={faVolumeMute} /> </span> */}
          </div> 
      </div>
      <div className="progress-div">
        <Progressbar />
      </div>
    </div>
  )
}

export default Player;