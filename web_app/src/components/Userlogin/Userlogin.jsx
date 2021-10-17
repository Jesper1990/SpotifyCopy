import React, { useState} from 'react'
import './Userlogin.css'
import { Link, useHistory } from "react-router-dom";

const Userlogin = () => {

  const history = useHistory()
  const [usernamex, setUsername] = useState('')
  const [passwordx, setPassword] = useState('')

  async function springLogin() {
    let username = usernamex
    let password = passwordx

    const credentials = 'username=' +
      encodeURIComponent(username)
      + '&password=' +
      encodeURIComponent(password)

    let response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: credentials
    });

    console.log(response)
    console.log(credentials);
    if (response.url.includes('error')) {
      console.log('Wrong username/password');
    } else {
      history.push('/')
    }
    

  }

  const whoAmI = () => {
    fetch('/api/whoami')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <div className='container'>
      <form className='form-group'>
        <input
          className="input-username"
          onChange={e => setUsername(e.target.value)}
          id='name'
          value={usernamex}
          placeholder='Username'
          type='text'
        ></input>
        <input
          className="input-password"
          onChange={e => setPassword(e.target.value)}
          id='password'
          value={passwordx}
          placeholder='Password'
          type='password'
        ></input>                
        <br /><br />       
      </form>
      
      <button onClick={springLogin} className='btn'>Login</button>
       <Link to="/register" className= "link">
        <p className="p-text">Not a member? Register now</p>
        </Link>
      <br />
     <button onClick={whoAmI}>Who Am I</button>     
    </div>
  )
}

export default Userlogin
