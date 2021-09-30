import React, { useState } from 'react';
import {useParams } from 'react-router-dom'
 
function Artist() {

  let {name} = useParams()
  console.log(name)

    const getArtist = () => {
     fetch(`https://yt-music-api.herokuapp.com/api/yt/search/${name}`)
       .then((res) => res.json())
       .then((data) => {
          setArtists(data.content)
         console.log(data.content)
         console.log(data.content[0].thumbnails[1].url)
       })
  }


  return (
    <h1>HarroW Justin Bäver!</h1>

  )
}

export default Artist;