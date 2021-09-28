/*import React, { useState } from 'react' 
 

function GetUsers(){

 const [data, setData] = React.useState([]);
  React.useEffect(() => {
    
    fetch("http://localhost:8080/api/appusers")
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(data)

  }, []);
  
   return (
    <div className="App">
     {data.map(({id,userName,password,email}) => ( 
       <p key={id}>{id} {userName} {password} {email} </p> 
      ))}
  </div>
     
      )
}

export default GetUsers;
    */