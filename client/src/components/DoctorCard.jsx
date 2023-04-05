import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';


export default function DoctorCard(props) {
    let Data = props.data;
    let navigate=useNavigate();
    const checkAvailability=()=>{
        // console.log(Data.userId);
        navigate('/check-availability/'+Data.userId)
    }
    return (
        <>

            <div class="card">
                <div class="card-header">Doctor Profile</div>
                <div class="card-content">
                    <div class="data-field">
                        <span class="data-label">Name:</span>
                        <span class="data-value">Dr. {Data.firstName + " " + Data.lastName}</span>
                    </div>
                    <div class="data-field">
                        <span class="data-label">Fees:</span>
                        <span class="data-value" style={{ fontSize: "bold" }}><i class="fa-solid fa-indian-rupee-sign"></i> {Data.fees}</span>
                    </div>
                    <div class="data-field">
                        <span class="data-label">Specialist:</span>
                        <span class="data-value">{Data.specialization}</span>
                    </div>
                    <div class="data-field">
                        <span class="data-label">Timing:</span>
                        <span class="data-value">{Data.timing[0] + "  " + Data.timing[1]}</span>
                    </div>
                </div>
                <button style={{maxWidth:'15rem', marginLeft:'.5rem'}} onClick={checkAvailability} className='btn btn-primary'> Book</button>
            </div>
        </>
    )
}
