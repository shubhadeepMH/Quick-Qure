import React, { useEffect, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {message}from 'antd'

export default function Home() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  let navigate=useNavigate()

  //Functions
  const handleRegistration = async () => {
    if (name && email && password) {
      let registerUser = await fetch('http://localhost:3000/register', {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      registerUser = await registerUser.json()
      if(!registerUser.success){
        return message.error(registerUser.message)
      }
      localStorage.setItem('user',JSON.stringify(registerUser.data))
      console.log(registerUser.data.email)
      navigate('/')
      message.success(registerUser.message)
      // alert(registerUser.message)
    }else{
      alert('Please fill all the fields')
     
    }
  }

  return (
    <>
      <div className='reg-container'>
        <h6>It will take just 5 sec only</h6>

        <div className="mb-3">

          <input onChange={(e) => setName(e.target.value)} placeholder='Enter your name' type="text" className="form-control" />

        </div>
        <div className="mb-3">

          <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' type="email" className="form-control" />

        </div>
        <div className="mb-3">

          <input onChange={(e) => setPassword(e.target.value)} placeholder='password' type="password" className="form-control" />
        </div>
        <button onClick={handleRegistration} className="btn btn-primary ">Submit</button>
        <p>Already have account <Link to='/logIn'>Log In</Link></p>

      </div>

    </>
  )
}
