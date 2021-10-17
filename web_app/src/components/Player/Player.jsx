import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faCompressArrowsAlt, faExpandArrowsAlt, faPause, faPlay, faStepBackward, faStepForward, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import './Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setVideoPlayer } from '../../redux/ducks/videoPlayer';
import ProgressBar from '../ProgressBar/ProgressBar'
import { setVideoIndex } from '../../redux/ducks/videoIndex';
import { setVideoId } from '../../redux/ducks/videoId';
import { Link } from 'react-router-dom';

const Player = () => {
  const dispatch = useDispatch()
  const videoId = useSelector(state => state.videoId.videoId)
  // const videoPlaylist = useSelector(state => state.videoPlaylist.videoPlaylist)
  const videoIndex = useSelector(state => state.videoIndex.videoIndex)
  const videoSongQueue = useSelector(state => state.videoSongQueue.videoSongQueue)
  const [player, setPlayer] = useState()
  const [isActive, setIsActive] = useState(true)
  const [viewPlayer, setViewPlayer] = useState(true)

  useEffect(() => {
    loadPlayer()
  }, [])

  useEffect(() => {
    if (videoId) {
      startSong()
      playSong()
    }
  }, [videoId])

  // useEffect(() => {
  //   if (videoPlaylist) {
  //     startPlaylist(videoPlaylist)
  //     playSong()
  //   }
  // }, [videoPlaylist])

  const loadPlayer = () => {
    let ytPlayer = new YT.Player('yt-player', {
      height: '400',
      width: '400',
      playerVars: {
        modestbranding: 1,
        controls: 0,
        rel: 0,
      },
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

  // const startPlaylist = () => {
  //   player.loadPlaylist(videoPlaylist, player.getPlaylistIndex())
  //   console.log(player.loadPlaylist());
  // }

  const playSong = () => {
    if (player.getPlayerState() != 1) {
      setIsActive(true)
      player.playVideo()
    } if (player.getPlayerState() == 1) {
      setIsActive(false)
      player.pauseVideo()
    }
  }
 
  const nextSong = () => {
    if (videoIndex < videoSongQueue.length) {
      const nextSong = videoSongQueue[videoIndex + 1]
      dispatch(setVideoIndex(videoIndex + 1))
      dispatch(setVideoId(nextSong.videoId))
    }
  }

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
        <ul className={viewPlayer ? 'player-show' : 'player-hidden'}>
          <div id="yt-player"></div>
        </ul>
        <div className="buttons">

        </div>
        <div id="yt-player"></div>
        <div className="player-container">
          {videoSongQueue ?
            <div className="display-player">
              <Link to="/mediaplayer">
              <img src={videoSongQueue[videoIndex].thumbnails[0].url} className="player-image" />
              </Link>
              <div className="player-name">
                <h4 className="player-artist">{videoSongQueue[videoIndex].artist.name}</h4>
                <p className="player-song">{videoSongQueue[videoIndex].name}</p>
                <div className="hide-playe" onClick={() => setViewPlayer(!viewPlayer)}>
                  {viewPlayer ?
                    <FontAwesomeIcon
                      icon={faExpandArrowsAlt}
                    />
                    :
                    <FontAwesomeIcon
                      icon={faCompressArrowsAlt}
                    />
                  }
                </div>
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
              {isActive ?
                <FontAwesomeIcon
                  className="play-pause"
                  icon={faPause}
                />
                :
                <FontAwesomeIcon
                  className="play-pause"
                  icon={faPlay}
                />}
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
          <span className="test-span">
            <FontAwesomeIcon
              className="fa-icon-volume"
              icon={faVolumeUp}
            />
          </span>
        </div> 
      </div>
      <div className="progress-div">
        <ProgressBar />
      </div>
    </div>
  )
}

export default Player;