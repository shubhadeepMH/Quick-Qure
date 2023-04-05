import React, { useState } from 'react'
import moment from 'moment'
import { Button, Form, Input, message, TimePicker } from 'antd'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function ApplyDoctor() {
    const [timing, setTiming] = useState([])
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth)
    let navigate = useNavigate()
    const handleFinish = async (value) => {
       
        let resp = await fetch('http://localhost:3000/apply-doctor', {
            method: 'post',
            body: JSON.stringify({ ...value, userId: auth._id,timing}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        resp = await resp.json()
        if (resp.success) {
            message.success("Applied successfully")
            navigate('/')
        }
    }
    return (
        <>
            <div className='apply-doctor-main'></div>
            <Sidebar />
            <div className='apply-doctor-body'>
                {/* <h4>Apply As Doctor</h4> */}
                <i className="fa-solid fa-note-medical heading">@ Apply  As   Doctor</i>




                <Form layout='horizontal' onFinish={handleFinish} >
                    <p>--Personal Details--</p>
                    <div className='personnel-detail'>
                        <Form.Item label='First Name' name='firstName' >
                            <Input required type='text'></Input>
                        </Form.Item>

                        <Form.Item required label='Last Name' name="lastName">
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item required label='Mobile Number' name='mobileNumber' >
                            <Input type='Number'></Input>
                        </Form.Item>
                        <Form.Item required label='email Id' name='email'>
                            <Input type='email'></Input>
                        </Form.Item>
                        <Form.Item required label='Address' name='address'>
                            <Input type='text'></Input>
                        </Form.Item>
                    </div>


                    <p>--Proffesional Details--</p>
                    <div className='personnel-detail'>

                        <Form.Item required label='Specialization ' name='specialization'>
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item required label='Experiance' name='experiance'>
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item required label='Fees' name='fees'>
                            <Input type='Number'></Input>
                        </Form.Item>
                        <Form.Item required label='Timing' name='timing'>
                            <TimePicker.RangePicker onChange={(value) => {
                                setTiming(
                                    [
                                    moment(value[0].format("HH:mm"))._i,
                                    moment(value[1].format("HH:mm"))._i,
                                    ]
                                )
                            }} />
                        </Form.Item>


                    </div>
                    <button className='btn btn-primary' type='submit' >Submit</button>
                </Form>


            </div>

        </>
    )
}
