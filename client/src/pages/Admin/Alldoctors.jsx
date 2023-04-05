import  {React,useState,useEffect}from 'react'
import Sidebar from '../../components/Sidebar'

export default function () {
  const [doctor,setDoctor]=useState([])
  const getDoctors=async()=>{
    let storeDoctors=await fetch('http://localhost:3000/all-doctors')
    storeDoctors=await storeDoctors.json()
    setDoctor(storeDoctors)
    // console.log(storeDoctors);
  }
 useEffect(()=>{
  getDoctors()
 },[])

  const handleDoctor=async(item)=>{
    let getId=item._id
    // console.log(getId);
    //For Approve Doctor
  if(item.status=='pending'){
    let getResp=await fetch('http://localhost:3000/approve-doctor',{
      method:'post',
      body:JSON.stringify({_id:getId}),
      headers:{
        'Content-Type':'application/json'
      }
     })
     getResp=await getResp.json();
     console.log(getResp);
     document.location.reload();
  }else{
    //For Unapprove/Block Doctor
    let getResp=await fetch('http://localhost:3000/block-doctor',{
      method:'post',
      body:JSON.stringify({_id:getId}),
      headers:{
        'Content-Type':'application/json'
      }
     })
     getResp=await getResp.json();
     console.log(getResp);
     document.location.reload();
  }
    
  }
  return (
    <>
    <div className='doctors-main'>
        <Sidebar/>
     
      <h2 className='heading'>--Doctors--</h2>
      
      <table className="table">
  <thead className='thead-dark'>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Name</th>
      <th scope="col">Ph No</th>
      <th scope="col">Status</th>
      <th scope="col">Fees</th>
      <th scope="col">Experties</th>
      <th scope="col">Experiance</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {doctor.map((item,index)=>{
    return(
      <tr key={index}>
        <th>{index+1}</th>
        <th>{item.firstName} {item.lastName}</th>
        <th>{item.mobileNumber} </th>
        <th>{item.email}</th>
        <th>{item.fees+" rs"}</th>
        <th>{item.specialization}</th>
        <th>{item.experiance+" "}years</th>
        <th className='mx-10'> <button onClick={()=>handleDoctor(item)}className={`${item.status=='pending'?"bg-success btn text-white":'bg-danger btn text-white'}`} >{item.status=='pending'?'Approve':'Block'}</button></th>

      </tr>
    )
  })}
  </tbody>
</table>
      </div>
    </>
  )
}

