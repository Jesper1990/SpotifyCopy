import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './ProgressBar.css'

const ProgressBar = () => {

  const videoPlayer = useSelector(state => state.videoPlayer.videoPlayer)
  const [progress, setProgress] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [minutesDuration, setMinutesDuration] = useState(0)
  const [secondsDuration, setSecondsDuration] = useState(0)


  useEffect(() => {
    if (!videoPlayer) return;
    setInterval(() => {
      //räknar ut längd på låt i %
      let currentTime = videoPlayer.getCurrentTime()
      let duration = videoPlayer.getDuration()
      let timelaps = 0;
      if (duration > 0) {
        timelaps = Math.floor((currentTime / duration) * 100);
      }
      setProgress(timelaps)
      getTime()
      getTimeDuration()
    }, 1000)
  }, [videoPlayer])


  const getTime = () => {
    const time = Math.floor(videoPlayer.getCurrentTime())
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds;
    setMinutes(minutes)
    setSeconds(seconds)
  }

  const getTimeDuration = () => {
    const time = Math.floor(videoPlayer.getDuration())
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds;
    setMinutesDuration(minutes)
    setSecondsDuration(seconds)
  }

  const seekBar = (e) => {
    if (videoPlayer.getPlayerState() == 1) {
      setProgress(e.target.value)
      let seekBarTo = videoPlayer.getDuration() * (e.target.value / 100)
      videoPlayer.seekTo(seekBarTo, true)
    }
  }

  return (
    <div className="progress-main">
      <div className="progress-bar">
        <input className="progress" value={progress} onChange={seekBar} type="range" />
      </div>
      <div className="progress-left">
        <span>{minutes}:{seconds}</span>
      </div>
      <div className="progress-right">
        <span>{minutesDuration}:{secondsDuration}</span>
      </div>

    </div>
  )
}

export default ProgressBar
