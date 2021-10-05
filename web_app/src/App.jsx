import React, { useState } from 'react'
import './App.css'
/*import GetUsers from './components/services/getUsers' */
import Register from './components/Register/Register'
import Start from './components/Start/Start';
import Navbar from './components/Navbar/Navbar.jsx'
import StartPage from './components/Pages/StartPage'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SongSearch from './components/SongSearch/SongSearch';
import Player from './components/Player/Player';
import Artist from './components/ArtistPage/ArtistPage';






function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Route path="/Artist/:browseid" component={Artist} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={Start} />
          <Route path="/search" component={SongSearch} />
          <Route path="/StartPage" exact component={StartPage} />
        </main>
        <br />

        <Player />



      </div>

    </Router>

  )
}

export default App
