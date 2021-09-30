import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 

const Player = () => {
  const videoId = useSelector(state => state.videoId.videoId)
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

  const loadPlayer = () => {
    let ytPlayer = new YT.Player('yt-player', {
      height: '400',
      width: '400',
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

  const playSong = () => {
    if (!isActive) {
      setIsActive(true)
      player.playVideo()
    } else {
      setIsActive(false)
      player.pauseVideo()
    }
  }


  return (
    <div>
      <div id="yt-player"></div>
      <div>
        <button onClick={playSong}>
          {isActive ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>

  )
}

export default Player;
