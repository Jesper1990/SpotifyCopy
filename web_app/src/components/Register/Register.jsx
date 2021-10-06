import axios from 'axios'
import React, { useState } from 'react'
import './Register.css'

function Register () {
  const url = 'http://localhost:8085/api/users'
  const [data, setData] = useState({
    name: '',
    //email: "",
    password: ''
  })

  function handle (e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function submit (e) {
    e.preventDefault()
    axios
      .post(url, {
        name: data.username,
        //email: data.email,
        password: data.password
      })
      .then(res => {
        console.log(res.data)
      })
  }

  return (
    <div className='container'>
      <form className='form-group' onSubmit={e => submit(e)}>
        <input
          onChange={e => handle(e)}
          id='name'
          value={data.username}
          placeholder='Username'
          type='text'
        ></input>
        <input
          onChange={e => handle(e)}
          id='password'
          value={data.password}
          placeholder='Password'
          type='password'
        ></input>

        <button className='btn'>Login</button>
        <p>Already a member? Login now</p>
      </form>
    </div>
  )
}

export default Register
