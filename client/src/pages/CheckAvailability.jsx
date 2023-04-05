import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'


export default function CheckAvailability() {
  const [ans, setAns] = useState('Not Available')//Change doctor availabity dynamically
  const [show, setShow] = useState(false)//Show availabily of doctor
  const [doctor, setDoctor] = useState() //store doctor profile
  const [time, setTime] = useState()//to store Time for checking availability
  const [date, setDate] = useState()//to store Date for checking availability
  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);

  let param = useParams()
  const getDoctor = async () => {
    let ans = await fetch('http://localhost:3000/doctor-profile/' + param.id)//Getting doctor profile from backend
    ans = await ans.json()//converting response readstream data to json(readable)
    setDoctor(ans)
  }
  useEffect(() => {
    getDoctor()
  })

  //Function for book appointment
  const bookAppointment = async() => {
    //Fetch API for store Appointment data to DataBase
    let getAns = await fetch('http://localhost:3000/book-appointment', {
      method:'post',
      body:JSON.stringify({ userId:auth._id, doctorId:doctor.userId, doctorInfo:doctor.firstName+" "+doctor.lastName, userInfo:auth.name, date, time }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    getAns = await getAns.json();
   if(getAns.success){
    message.success(getAns.message)//Appointment booked successfuly message show
   }
   setDate('')
    setTime('')
  }
  //To check that is doctor available or not at selected time slot.
  const checkAvailability = async() => {
   try {
    if(!time && !date){
      message.error("Please selcet date and time")
    }else{
      let res=await fetch('http://localhost:3000/booking-availability',{
      method:'post',
      body:JSON.stringify({date,time,doctorId:param.doctorId}),
      headers:{
        "Content-Type":"Application/json",
      }
    })
    res=await res.json()
    if(res.success){
      setAns("Available")
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 5000);
    }else{
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 5000);
      
    }
    }
    
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div>
      <Sidebar />
      <div className='avail-body'>
        <div className="card">
          <div className="card-header">
            <h2>Check doctor availability And Book your Appointment</h2>
          </div>
          <div className="card-body">
            <div className="field">
              <label>Name:</label>
              <span style={{ fontStyle: 'bold', fontSize: '1.7rem' }}>{doctor ?"Dr."+ doctor.firstName + " " + doctor.lastName : "Dr.John Doe"}</span>
            </div>
            <div className="field">
              <label>Speciality:</label>
              <span>{doctor ? doctor.specialization : "General"}</span>
            </div>
            <div className="field">
              <label>Experience:</label>
              <span>{doctor ? doctor.experiance : "2"} years</span>
            </div>
            <div className="field">
              <label>Fees:</label>
              <span>{doctor ? doctor.fees + " " : "200"}Rs</span>
            </div>
            <div className="field">
              <label>Date:</label>
              <input onChange={(e) => {setDate(e.target.value), setAns("Not Available"),setShow(false)}} type="date" id="date" name="date" required />
            </div>
            <div className="field">
              <label>Time:</label>
              <input onChange={(e) => {setTime(e.target.value) , setAns("Not Available"),setShow(false)}} type="time" id="time" name="time" required />
            </div>
          </div>
          <button onClick={checkAvailability} style={{ font: '300', fontFamily: 'sans-serif', color: 'gold' }} className='btn btn-primary'>Check Availability</button>
         {
          ans=="Available"&&( <button onClick={bookAppointment} style={{ font: '300', fontFamily: 'sans-serif', color: 'gold', marginTop: '.5rem' }} className='btn btn-dark'>Book Now</button>)
         }
        </div>
        {show && <div className={`ans ${ans === 'Available' ? 'available' : 'not-available'}`} style={{ margin: 'auto', textAlign: 'center', fontSize: 'large', font: 'Bold', }}><strong>At selected date and time doctor is  {ans}</strong></div>}
      </div>
    </div>
  )
}
