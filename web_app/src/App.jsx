import React, { useState } from 'react'
import './App.css'
/*import GetUsers from './components/services/getUsers' */
import RegisterPage from './components/services/RegisterPage'
import StartPage from './components/services/StartPage';

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

function App() {

 

  return (
    <Router>
      
       <nav>
    <Link to="/register">Register</Link>
  </nav>

      <Route path="/register" component={RegisterPage} />
      <Route path="/" exact component={StartPage} />
      </Router>
     
  )
}

export default App
