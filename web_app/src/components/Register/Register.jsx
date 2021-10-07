import React, { useState } from 'react'
import './Register.css'

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
          onChange={e => setUsername(e.target.value)}
          id='name'
          value={username}
          placeholder='Username'
          type='text'
        ></input>
        <input
          onChange={e => setPassword(e.target.value)}
          id='password'
          value={password}
          placeholder='Password'
          type='password'
        ></input>

        <button className='btn'>Register</button>
        <br />
        <p>Already a member? Login now</p>
      </form>
    </div>
  )
}

export default Register
