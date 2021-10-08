import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPause, faPlay, faStepBackward, faStepForward, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setVideoPlayer } from '../../redux/ducks/videoPlayer';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 
// TODO: Updatera spellistan så den kan starta från index inte från början!

const Player = () => {
  const dispatch = useDispatch()
  // State på 1 specifikt ID som skickas via onClick i sökfunktionen.
  const videoId = useSelector(state => state.videoId.videoId)
  // State på en Array utav ID:s som skickas via onClick i sökfunktionen, skall separeras för bättre funktionalitet.
  const videoPlaylist = useSelector(state => state.videoPlaylist.videoPlaylist)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(true)
  const [progress, setProgress] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [minutesDuration, setMinutesDuration] = useState(0)
  const [secondsDuration, setSecondsDuration] = useState(0)

  useEffect(() => {
    loadPlayer()
  }, [])

  useEffect(() => {
    if (!player) return
    setInterval(() => {
      let currentTime = player.getCurrentTime()
      let duration = player.getDuration()
      let timelaps = Math.floor((currentTime / duration) * 100);

      setProgress(timelaps)
      getTime()
      getTimeDuration()

    }, 1000)


  }, [player])


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
    // console.log(player.loadVideoById());
    // console.log(player.loadVideoById().playerInfo);
    // console.log(player.getDuration());
  }
  // Funktion för att ladda spelaren med en spellista (en array utav ID:s som skickas via store.)
  const startPlaylist = () => {
    player.loadPlaylist(videoPlaylist, player.getPlaylistIndex())
    console.log(player.loadPlaylist());
    // console.log(videoPlaylist + videoIndex);
    // videoPlaylist.forEach((value) => player.cueVideoById(value))
    // videoPlaylist.forEach((value) => console.log(value))
    // player.cuePlaylist(videoPlaylist)
    // videoPlaylist.forEach((value, index) => player.loadPlaylist(videoPlaylist, index))
    // videoPlaylist.forEach((index) => console.log(index))
    // videoPlaylist.forEach((value, index) => console.log(`${index} : ${value}`))
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
  // currentSongindex +1
  // setVideo on next index
  // previousVideo -1
  const nextSong = () => {
    // startSong(videoIndex)
    player.nextVideo()
  }
  // Funktion för knappen "Previous"
  const previousSong = () => {
    player.previousVideo()
  }
  const getTime = () => {
    const time = Math.floor(player.getCurrentTime())
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds;
    setMinutes(minutes)
    setSeconds(seconds)

  }
  const getTimeDuration = () => {
    const time = Math.floor(player.getDuration())
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds;
    setMinutesDuration(minutes)
    setSecondsDuration(seconds)
    // console.log(context.player.getCurrentTime())
  }
  const seekBar = (e) => {
    if (player.getPlayerState() == 1) {
      setProgress(e.target.value)
      let seekBarTo = player.getDuration() * (e.target.value / 100)
      player.seekTo(seekBarTo, true)
    }
  }

  return (
    <div className="music-sticky">
      <div id="yt-player"></div>
      <div className="buttons">
        <ul className="list-buttons">
          <button onClick={getTime}>click me </button>
          <div className="volume-slider">
            <span><FontAwesomeIcon className="fa-icon" icon={faVolumeMute} /> </span>
            <input
              type="range"
              min="0"
              max="100"
              onChange={(e) => player.setVolume(e.target.value)}
            />
            <span><FontAwesomeIcon className="fa-icon" icon={faVolumeUp} /></span>
          </div>
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
        <div className="progress-div">
          <p>{minutes}:{seconds}</p>
          <input className="progress" value={progress} onChange={seekBar} type="range" />
          <p>{minutesDuration}:{secondsDuration}</p>
          <div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Player;