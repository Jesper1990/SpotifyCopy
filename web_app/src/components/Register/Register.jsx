import React, { useState } from 'react';
import './Register.css'


const Register = () => {
   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

   const handleSubmit = (e) => {
    e.preventDefault();
     const newUser = { name, email, password };
     
      fetch('http://localhost:8085/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    }).then(() => {
      console.log('New user added');
      
    });
  };

    
  

  return (
    
    <div className = "container">
      <form className="form-group" onSubmit={handleSubmit}>
        <input onChange={(e) => setEmail(e.target.value)} id="email" value={email} placeholder="@Email" type="text"></input>
        <input onChange={(e) =>setName(e.target.value)} id="name" value={name} placeholder="Username" type="text"></input>
        <input onChange={(e) =>setPassword(e.target.value)} id="password" value={password} placeholder="Password" type="text"></input>
        
        <button className="btn">Submit</button>
        <p>Already a member? Login now</p>
      </form>
      </div>
      
  );
}

export default Register;