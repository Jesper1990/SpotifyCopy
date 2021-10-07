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
      {/* <div className="logo-container">
        <h1 className="navbar-logo" href="localhost:3000/startPage" >
          CopiFy <i className="fab fa-spotify" ></i>
        </h1>
      </div>

      <div className="menu-container">
        <h1 className="" href="localhost:3000/startPage" >
          CopiFy <i className="fab fa-spotify" ></i>
        </h1>
      </div>

      <div className="link-container">
        <h1 className="" href="localhost:3000/startPage" >
          CopiFy <i className="fab fa-spotify" ></i>
        </h1>
      </div> */}
      <h1 className="navbar-logo" href="localhost:3000/startPage" >
        CopiFy <i className="fab fa-spotify" ></i>
      </h1>
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
            //
          )
        })}
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>


    </nav>
  )

}


export default Navbar;

