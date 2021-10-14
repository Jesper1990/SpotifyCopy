import React, { useState } from 'react'
import './Register.css'
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const newUser = { username, password }

    fetch('http://localhost:4000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    }).then(() => {
      console.log(newUser)
    })
  }

  return (
    <div className='container'>
      <form className='form-group' onSubmit={handleSubmit}>
        <input
          className="input-username"
          onChange={e => setUsername(e.target.value)}
          id='name'
          value={username}
          placeholder='Username'
          type='text'
        ></input>
        <input
          className="input-password"
          onChange={e => setPassword(e.target.value)}
          id='password'
          value={password}
          placeholder='Password'
          type='password'
        ></input>

        <button className='btn'>Submit</button>
        <br />
        <Link to="/Userlogin" className="link">
        <p className="p-text">Already a member? Login now</p>
        </Link>
      </form>
    </div>
  )
}

export default Register
