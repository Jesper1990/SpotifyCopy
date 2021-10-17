import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import MenuItems from './MenuItems';
import '../Navbar/Navbar.css';



const Navbar = () => {

  const logout = () => {
    fetch('/logout')
  }


  const [isOpen, setIsOpen] = useState(false);
  return (

    <nav className="NavbarItems">
      <Link to="/" className="logo-link">
        <h1 className="navbar-logo" >
          CopiFy <i className="fab fa-spotify" ></i>
        </h1>
      </Link>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={isOpen ? 'nav-menu act' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url} onClick={() => setIsOpen(!isOpen)} >
                {item.title}</Link>
            </li>
          )
        })}
        <li>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;

