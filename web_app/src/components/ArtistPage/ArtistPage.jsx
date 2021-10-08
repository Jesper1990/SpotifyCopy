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

  const [clicked, setClicked] = useState(false)

  const toggleClick = () => {
    
    setClicked(!clicked)
    
  }
  
  
  return (
    <div>

      

      
      
      <h1 className="artist-name">{artists && artists.name}</h1>
      <div className="btn-container">
      <button className="card-btn" onClick={toggleClick}>About</button>
      <button onClick={togglePopup} className="btn-popup">Share with Link</button>
      </div>
      {clicked && (
      <div className="card-container">
      <div className="card">
        
        <p className="artist-description">{artists && artists.description}</p>
        <div className="card-footer">
         <button className="card-btn" onClick={toggleClick}>Close</button>
        </div>
        </div>
        </div>
      )}
      
      <h3 className="songs-title">Most popular songs!</h3>

        <div className="grid-container">
          {artists && artists.products.singles.content.map(song => (
            <div className="grid-display">
              <div className="song-container">
                <img className="song-pic" src={song.thumbnails[0].url} />
                <div className="song-name">
                  <h4>{song.name}</h4>
                </div>
              </div>
            </div>

          ))}
        </div>
      
       {/* <div>{artists && artists.products.singles.content.map(song => (
        <ul>
        <li>
          {song.name}
        <img className="song-pic" src = {song.thumbnails[0].url}></img>
          </li>
          </ul>
           
        
      ))}</div> */}

      <h3 className="albums-title">Albums!</h3>
      <div>{artists && artists.products.albums.content.map(album => (
        <div>
          <p>{album.name}</p>
          <img src = {album.thumbnails[0].url}></img>
        </div>
      ))}</div>
      
      
      
     
      {popup && (
        <div className="popup">
        <div className="overlay"></div>
        <div className="popup-content">

            <input
              type="text"
              placeholder={`http://localhost:3000/artist/${browseid}`}
            />
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