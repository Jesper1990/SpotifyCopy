import axios from "axios";
import React, { useState } from 'react';
import './registerPage.css'

function RegisterPage() {
  const url = "http://localhost:8085/api/users"
  const [data, setData] = useState({
    name: "",
    email: "",
    password:""
  })

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      name: data.name,
      email: data.email,
      password: data.password
    })
      .then(res =>{
      console.log(res.data)
    })
    
  }

  return (
    
    <div className = "container">
      <form className="form-group" onSubmit={(e) => submit(e)}>
        <input onChange={(e) => handle(e)} id="email" value={data.email} placeholder="@Email" type="text"></input>
        <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Username" type="text"></input>
        <input onChange={(e)=>handle(e)} id="password" value={data.password} placeholder="Password" type="text"></input>
        
        <button className="btn">Submit</button>
        <p>Already a member? Login now</p>
      </form>
      </div>
      
  );
}

export default RegisterPage;