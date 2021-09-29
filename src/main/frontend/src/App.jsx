import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import StartPage from './components/Pages/StartPage'





function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Route path="/StartPage" exact component={StartPage} />
        </main>


      </div>
    </Router>
  )
}

export default App
