import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'


 
function Artist() {

  const [artists, setArtists] = useState()
  let { browseid } = useParams()

  useEffect(() => {
    let canceled = false

    if (!browseid) {
      return
    }
    fetch(`https://yt-music-api.herokuapp.com/api/yt/artist/${browseid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
         setArtists(data)
        }
      })
    return () => {
      canceled = true
    }
  }, [])
  console.log("hej", artists)

  
  return (
    <div>
           <h1>{artists && artists.name}</h1>
      <p>{artists && artists.description}</p> 
    </div>
  )
      }
export default Artist;