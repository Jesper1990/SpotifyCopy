import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePicture from './images/start-pic2.jpg'
import Assault from './images/assault.jpg'
import Die4u from './images/die4u.jpg'
import Eskimo from './images/eskimo.jpg'
import Stay from './images/stay.jpg'
import './Start.css'

function Start() {
  return (
    <div>
      <div className="image-container">
        <Link to="/register">
        <img src={ProfilePicture} className="start-picture" />
        </Link>
      </div>
      <div className="news-container">
        <h2 className="news-header">Nyheter</h2>
        <div className="image-grid">
          <div><img src={Stay} className="news-picture" /></div>
          <div><img src={Assault} className="news-picture" /></div>
          <div><img src={Die4u} className="news-picture" /></div>
          <div><img src={Eskimo} className="news-picture" /></div>  
        </div>
      </div>
    </div>
  )
}

export default Start;