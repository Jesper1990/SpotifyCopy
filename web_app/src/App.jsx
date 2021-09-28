import React, { useState } from 'react'
import './App.css'
/*import GetUsers from './components/services/getUsers' */
import Register from './components/Register/Register'
import Start from './components/Start/Start';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PlayerSearch from './components/PlayerSearch/PlayerSearch';


function App() {

  return (
    <Router> 
      <nav>
        <Link to="/register">Register</Link>
      </nav>

      <Route path="/register" component={Register} />
      <Route path="/" exact component={Start} />
      <PlayerSearch />
      </Router>
     
  )
}

export default App
