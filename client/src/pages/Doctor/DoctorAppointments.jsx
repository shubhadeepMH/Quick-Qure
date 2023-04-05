import { React, useEffect, useState } from 'react'
import moment from 'moment'
import Sidebar from '../../components/Sidebar';




export default function Appointments() {
    const [appointments, setAppointments] = useState([])

    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);
    const getAppointments = async () => {
        let getData = await fetch(`http://localhost:3000/doctor-appointments/${auth._id}`)
        getData = await getData.json();
        if (getData) {
            setAppointments(getData);
        }
    }
    useEffect(() => {
        getAppointments()
        // console.log(appointments);
    })


    const approveAppointment=async(item)=>{
        // console.log(item);
        let ans=await fetch('http://localhost:3000/approve-appointment',{
            method:'post',
            body:JSON.stringify({userId:item.userId,doctorId:item.doctorId,_id:item._id}),
            headers:{
                "Content-Type":"Application/json"
            }
        })
        document.location.reload();

    }
    const rejectAppointment=async(item)=>{
        let ans=await fetch('http://localhost:3000/reject-appointment',{
            method:'post',
            body:JSON.stringify({userId:item.userId,doctorId:item.doctorId,_id:item._id}),
            headers:{
                "Content-Type":"Application/json"
            }
        })
        document.location.reload();

    }


    return (
        <>
            <Sidebar/>
            <div className='table-body'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">N0</th>
                            <th scope="col">Patient</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                    {appointments.data && appointments.data.map((item,index)=>{
                        {/* console.log(appointments.data) */}
                      return  (   <tr>
                            <th scope="row">{index}</th>
                            <td>{item.userInfo}</td>
                            <td>{moment(item.date).format("dddd, MMMM Do")}</td>
                            <td>{moment(item.time).format(" h:mm a")}</td>
                            <td>{item.status}</td>
                            <td>
                            <button onClick={()=>approveAppointment(item)} style={{marginRight:'1rem'}} className='btn btn-success'>Approve</button>
                            <button onClick={()=>rejectAppointment(item)} className='btn btn-danger'>Reject</button>
                            </td>
                        </tr>
                        )
                    })}
                       
                    </tbody>
                </table>
            </div>
        </>
    )
}
