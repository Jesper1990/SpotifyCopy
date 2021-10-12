import { faPlay, faRandom, faRetweet, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import './MediaPlayer.css'

const MediaPlayer = () => {
  const videoSongQueue = useSelector(state => state.videoSongQueue.videoSongQueue)
  const videoIndex = useSelector(state => state.videoIndex.videoIndex)

  return (
    <div className="media-player-content">
      {videoSongQueue ? 
        <div className="media-player">
          <img src={videoSongQueue[videoIndex].thumbnails[1].url} className="media-picture" />
          <div className="media-text">
            <h4 className="media-artist">{videoSongQueue[videoIndex].name}</h4>
            <p className="media-song">{videoSongQueue[videoIndex].artist.name}</p>
          </div>
          <ProgressBar />
          <div className="media-buttons">
            <div className="fa-center">
               <FontAwesomeIcon icon={faRandom}  className="fa-icon" />
            </div>    
            <div className="fa-background">
              <FontAwesomeIcon icon={faStepBackward} className="fa-icon" />
            </div>          
            <div className="media-play-fa">
              <FontAwesomeIcon icon={faPlay} className="media-fa-play" />
            </div>                      
            <div className="fa-background">
              <FontAwesomeIcon icon={faStepForward} className="fa-icon" />
            </div>           
            <div className="fa-center">
              <FontAwesomeIcon icon={faRetweet} className="fa-icon" />
            </div>
          </div>
        </div>
        :
        <div />
      }     
    </div>
   );
}
 
export default MediaPlayer;