import React from 'react'
import './App.css'
import Register from './components/Register/Register'
import Userlogin from './components/Userlogin/Userlogin'
import Start from './components/Start/Start';
import Navbar from './components/Navbar/Navbar.jsx'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SongSearch from './components/SongSearch/SongSearch';
import Player from './components/Player/Player';
import Artist from './components/ArtistPage/ArtistPage';
import Playlist from './components/Playlist/Playlist';
import MediaPlayer from './components/MediaPlayer/MediaPlayer';


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/Artist/:browseid" component={Artist} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Start} />
        <Route path="/search" component={SongSearch} />
        <Route path="/Userlogin" exact component={Userlogin} />
        <Route path="/Playlist" exact component={Playlist} />
        <Route path="/mediaplayer" exact component={MediaPlayer} />
        <Player />
      </div>
    </Router>
  )
}

export default App
