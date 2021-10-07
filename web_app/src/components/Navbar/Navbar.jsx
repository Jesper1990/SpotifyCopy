import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import MenuItems from './MenuItems';
import '../Navbar/Navbar.css';



function Navbar() {


    function logout() {
      fetch('/logout')
    }


  const [isOpen, setIsOpen] = useState(false);
  return (

    <nav className="NavbarItems">
      <h1 className="navbar-logo" >
        CopiFy <i className="fab fa-spotify"></i>
      </h1>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      {/* <div className="testdiv"> */}
      <ul className={isOpen ? 'nav.menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url} onClick={() => setIsOpen(!isOpen)}>
                {item.title}</Link>
            </li>

          )
        })}
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
      {/* </div> */}

    </nav>
  )

}


export default Navbar;

