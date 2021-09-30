import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 
 
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
    <div>
      <div id="yt-player"></div>
      <div>
        <button onClick={playSong}>
          { isActive ? 'Pause' : 'Play' }
        </button>
        <button onClick={nextSong}>
          Next
        </button>
        <button onClick={previousSong}>Previous</button>
      </div>
    </div>
  )
}

export default Player;
