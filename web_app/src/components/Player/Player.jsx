import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


// TODO: Updatera så att Play/Pause knappen även kollar state på ifall spelaren är Aktiv! 

const Player = () => {
  const videoId = useSelector(state => state.videoId.videoId)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(true)
  // const [progress, setProgress] = useState()



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
      enablejsapi: 1,
      width: '400',
      events: {


        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        // onStateChange: testplayer
      }

    })
    // window.onclick = () => {
    //   console.log(player);
    //   alert(player.getCurrentTime);
    // }
    setPlayer(ytPlayer)
  }
  // const testplayer = (event) => {
  //   if (event.data == YT.PlayerState.PLAYING) {
  //     // let playerCurrentTime = player.getCurrentTime();
  //     myTimer = setInterval(function () {
  //       var playerCurrentTime = player.getCurrentTime();

  //       var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
  //     }
  //   }
  // }











  const showState = (event) => {
    if (event.data != YT.PlayerState.PLAYING) {
      player.getPlayerState()
      player.SeekTo()
      //  player.getCurrentTime()
      console.log(showState)
      return
    }
  }

  const onPlayerReady = (event) => {
    event.target.playVideo
  }
  // function onPlayerReady(event) {
  //   player = event.target;
  //   event.target.playVideo();
  // }
  const onPlayerStateChange = (event) => {
    if (event.data != YT.PlayerState.PLAYING)
      //   setIsActive(false)
      //   player.pauseVideo()
      // } else {
      //   setIsActive(true)
      //   player.playVideo()
      // }

      return
  }

  const startSong = () => {
    player.loadVideoById(videoId)
    console.log(player.getCurrentTime)
  }


  const playSong = () => {
    if (YT.PlayerState.PLAYING) {
      // (!isActive) {
      setIsActive(true)
      player.playVideo()
    }
    if (YT.PlayerState.PLAYING) {
      setIsActive(false)
      player.pauseVideo()

    }
  }
  // const pauseSong = () => {
  //   if (YT.PlayerState.PLAYING) {
  //     player.pauseVideo()
  //   }

  // }

  const progress = () => {
    if (YT.PlayerState.state == YT.PlayerState.PLAYING) {


      player.seekTo(100)
    }
  }

  // const checkState = () => {
  //   if (YT.PlayerState.PLAYING) {
  //     player.getCurrentTime()
  //     player.seekTo(currentTime, true)
  //   }
  // }

  const currentTime = (event) => {
    let playerCurrentTime = player.getCurrentTime();
    if (YT.PlayerState.state == YT.PlayerState.PLAY) {
      playerCurrentTime = true
    }
    // onReady.getCurrentTime
    // player.getCurrentTime(videoId)
    // console.log(player.getCurrentTime)
    // player.getDuratation()
    // console.log(player.getDuratation)
  }



  return (
    <div>
      <div id="yt-player"></div>
      <div>
        <button onClick={playSong}>
          {isActive ? 'Play' : 'Pause'}
        </button>
        <br />
        {/* <button onClick={pauseSong}>
          {isActive ? 'Play' : 'Pause'}
        </button> */}
        <input type="range" id="bar" value={currentTime} max="100" onChange={currentTime} />
        <input type="range" value={currentTime} min="0" max="100" onChange={progress} />

        {/* <button onclick={checkState}>Button</button> */}
      </div>
    </div>

  )
}

export default Player;
