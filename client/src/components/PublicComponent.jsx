import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateComponent() {
   let auth=localStorage.getItem('user')
  //  console.log(auth);
  return (!auth?<Outlet></Outlet>:<Navigate to='/'/>)
}