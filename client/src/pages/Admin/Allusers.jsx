import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'


export default function AllUsers() {
  const [user,setUsers]=useState([])
  const getusers=async()=>{
    let storeUsers=await fetch('http://localhost:3000/all-users')
    storeUsers=await storeUsers.json()
    setUsers(storeUsers)
    // console.log(storeUsers);
  }
 useEffect(()=>{
  getusers()
 },[])

  return (
    <>
    <div className='users-main'>
      <Sidebar/>
      <h2 className='heading'>--Users--</h2>
      
      <table className="table">
  <thead className='thead-dark'>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Is Doctor</th>
      <th scope="col">Is Admin</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {user.map((item,index)=>{
    return(
      <tr>
        <th>{index+1}</th>
        <th>{item.name}</th>
        <th>{item.email}</th>
        <th>{item.isDoctor?"True":"False"}</th>
        <th>{item.isAdmin?"True":"False"}</th>
        <th className='mx-10'> <button className='action-btn btn bg-danger text-white' >Block</button></th>

      </tr>
    )
  })}
  </tbody>
</table>
      </div>
    </>
  )
}
