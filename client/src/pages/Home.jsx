import React from 'react'
import './Home.css'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  let navigate=useNavigate()
  const direct=()=>{
   navigate('/doctor-list')
  }
  return (
    <>
      <div className='main'>
        <div className='home-body'>
          <Sidebar/>
    
          <div className='body-content'>
          <section className="doctor-image">
		<div className="container">
			<h2>Book Your Appointment Today</h2>
			<p>Our experienced doctors are ready to help you with any health concerns. Book your appointment now and take the first step towards better health.</p>
			<button onClick={direct}>Book Now</button>
		</div>
	</section>
	<section className="content">
		<div className="container">
			<h1>World className Doctors</h1>
			<p>Our doctor appointment system makes it easy for you to schedule appointments with your preferred doctor. With our simple and user-friendly platform, you can quickly book an appointment, view your medical history, and get reminders for your upcoming appointments. </p>
			<img src="https://media.istockphoto.com/id/1383445193/photo/shot-of-a-young-male-doctor-using-a-digital-tablet-at-work.jpg?b=1&s=170667a&w=0&k=20&c=WXxPWCe-tmm6bigTeHHbyp5MpnxLyQ1sTvb-Git9nVw=" alt="Doctor and patient" className="image"/>
			<p>Whether you're a new patient or an existing one, our system makes it easy for you to manage your healthcare needs. Our experienced doctors are dedicated to providing high-quality medical care and personalized attention to each patient. </p>
			<button>Get Started</button>
		</div>
	</section>

          </div>
        </div>

      </div>

    </>
  )
}
