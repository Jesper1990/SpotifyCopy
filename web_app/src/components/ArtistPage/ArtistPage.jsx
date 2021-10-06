import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './ArtistPage.css'


 
function Artist() {

  const [artists, setArtists] = useState()
  let { browseid } = useParams()

  const [popup, setPopup] = useState(false);

  const togglePopup = () => {
    setPopup(!popup)
  }


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
      <div>{artists && artists.products.albums.content.map(album => (
        <div> {album.thumbnails[0].url} </div>
        
      ))}</div>
      <p>{artists && artists.products.songs.content.map(song=> (
        <div>{song.name}</div>
      ))}</p>
      
       
      <button onClick={togglePopup} className="btn-popup">Share Artist with a Link!</button>
     
      {popup && (
        <div className="popup">
        <div className="overlay"></div>
        <div className="popup-content">
            <h2>http://localhost:3000/artist/{browseid}</h2>

            <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/artist/${browseid}`)} >
            Copy Link!
          </button>
          
          <button onClick={togglePopup} className="close-popup" >Close</button>
        </div>
        
    </div>
      )}
      
    </div>
   

  )
      }
export default Artist;