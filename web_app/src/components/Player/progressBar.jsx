import React, { useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'

const Progressbar = () => {
  const [context, updateContext] = useContext(PlayerContext)
  const [progress, setProgress] = useState(0)

  //räknar ut längd på låt i %

  useEffect(() => {
    if (!context.player) return
    // if (player.getPlayerState() != 0) return
    setInterval(() => {
      let currentTime = context.player.getCurrentTime()
      console.log('currenttime' + currentTime)
      let duration = context.player.getDuration()
      console.log('duration' + duration)

      let timelaps = (currentTime / duration) * 100;
      console.log(timelaps)
      setProgress(timelaps)
    }, 1000)
    console.log(context.player)

  }, [context.player])


  const seekBar = (e) => {
    setProgress(e.target.value)
    let seekBarTo = context.player.getDuration() / e.target.value
    context.player.seekTo(seekBarTo, true)
  }
  return (
    <div>
      <input className="progress" value={progress} onChange={seekBar} type="range" />
    </div>
  )
}

export default Progressbar
