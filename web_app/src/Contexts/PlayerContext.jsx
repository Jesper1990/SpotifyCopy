import React, { createContext, useState } from 'react'


//
export const PlayerContext = createContext()

function PlayerContextProvider(props) {
  const [context, setContext] = useState({
    player: null,
    queue: [],
    currentSong: null

  })
  //använda spread för att behålla gammal data
  //och skirver över endast det som matchar
  function updateContext(values) {
    setContext({
      ...context,
      ...values
    })

  }


  return (
    <PlayerContext.Provider value={[context, updateContext]}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
