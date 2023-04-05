import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {message } from 'antd'

export default function About() {
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()

  let navigate=useNavigate();
  //Functions

  const handleLogIn=async()=>{
    if(email&&password){
      let loggedUser=await fetch('http://localhost:3000/logIn',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      loggedUser=await loggedUser.json()
      if(loggedUser.seccess){
        // console.log(loggedUser.data);
        localStorage.setItem('user',JSON.stringify(loggedUser.data))
        navigate('/')
        message.success(loggedUser.message)
      }else{
        message.error(loggedUser.message)
      }

    }else{
      alert("Please fill all the required fields")
    }
  }
  return (
    <>
       <div className='reg-container'>
        <h3>Log In Here</h3>
   
        
      
          <div className="mb-3">
          
            <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email' type="email" className="form-control"  aria-describedby="emailHelp"/>
          
          </div>
          <div className="mb-3">
          
            <input onChange={(e)=>setPassword(e.target.value)} placeholder='password' type="password" className="form-control" />
          </div>
          <button onClick={handleLogIn} className="btn btn-primary">LogIn</button>
          <p>Not a user <Link to='/register'> Create acount</Link></p>
         
        
      </div>
    </>
  )
}
