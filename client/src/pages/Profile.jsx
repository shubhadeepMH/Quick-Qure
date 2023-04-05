import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, TimePicker } from 'antd'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


export default function Profile() {
    const [prof, setProf] = useState()
    let auth = localStorage.getItem('user')
    let navigate=useNavigate()
    auth = JSON.parse(auth)
    const getDoctors = async () => {
        let storeDoctors = await fetch(`http://localhost:3000/doctor-profile/${auth._id}`)
        storeDoctors = await storeDoctors.json()
        setProf(storeDoctors)
        //   console.log(prof);
    }
    useEffect(() => {
        getDoctors()
    })
    // console.log(prof && prof.firstName);

    const handleUpdate =async(value) => {
        let ans=await fetch('http://localhost:3000/update-profile',{
        method:"post",
        body:JSON.stringify({...value,userId:auth._id,timing:[
            moment(value.timing[0].format("HH:mm"))._i,
            moment(value.timing[1].format("HH:mm"))._i,
        ]}),
        headers:{
            'Content-Type':'Application/json'
        }
        })
        ans=await ans.json()
        if(ans.success){
            message.success(ans.message)
            navigate('/')
        }
       
    }
    return (
        <>
            <div className='apply-doctor-main'></div>
            <Sidebar />
            {prof && <div className='apply-doctor-body'>
                <h2>You can update personel details</h2>



                <Form layout='horizontal' initialValues={{
                    ...prof,
                  timing:[
                    moment(prof.timing[0],'HH:mm'),
                    moment(prof.timing[1],'HH:mm')
                  ]
                }}  onFinish={handleUpdate} >
                    <p>--Personal Details--</p>
                    <div className='personnel-detail'>
                        <Form.Item label='First Name' name='firstName' >
                            <Input type='text'></Input>
                        </Form.Item>

                        <Form.Item label='Last Name' name="lastName">
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item label='Mobile Number' name='mobileNumber' >
                            <Input type='Number'></Input>
                        </Form.Item>
                        <Form.Item label='email Id' name='email'>
                            <Input type='email'></Input>
                        </Form.Item>
                        <Form.Item label='Address' name='address'>
                            <Input type='text'></Input>
                        </Form.Item>
                    </div>


                    <h2>You can update Profesional details</h2>
                    <p>--Professional Details--</p>
                    <div className='personnel-detail'>
                        <Form.Item label='Specialization ' name='specialization'>
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item label='Experiance' name='experiance'>
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item label='Fees' name='fees'>
                            <Input type='Number'></Input>
                        </Form.Item>
                        <Form.Item label='timing' name='timing'>
                            <TimePicker.RangePicker />
                        </Form.Item>


                    </div>
                    <button className='btn btn-primary' type='submit' >Update</button>
                </Form>
            </div>}

        </>
    )
}
