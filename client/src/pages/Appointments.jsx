import { React, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Table } from 'antd';
import moment from 'moment'




export default function Appointments() {
    const [appointments, setAppointments] = useState([])

    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth);
    const getAppointments = async () => {
        let getData = await fetch(`http://localhost:3000/appointments/${auth._id}`)
        getData = await getData.json();
        if (getData) {
            setAppointments(getData);
        }
    }
    useEffect(() => {
        getAppointments()
        // console.log(appointments);
    })





    return (
        <>
            <Sidebar />
            <div className='table-body'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope="col">N0</th>
                            <th scope="col">Docotor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {appointments.data && appointments.data.map((item, index) => {
                            return (<tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{item.doctorInfo}</td>
                                <td>{moment(item.date).format("dddd, MMMM Do ")}</td>
                                <td>{moment(item.time).format(" h:mm a")}</td>
                                <td>{item.status}</td>
                            </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}
