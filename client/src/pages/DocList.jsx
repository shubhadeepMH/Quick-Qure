import { Row ,Input} from 'antd'
const { Search } = Input;
import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import Sidebar from '../components/Sidebar'

export default function DocList() {
    const [doctor, setDoctor] = useState([])
    const getDoctors = async () => {
        let storeDoctors = await fetch('http://localhost:3000/get-doctors')
        storeDoctors = await storeDoctors.json()
        setDoctor(storeDoctors)
        //   console.log(storeDoctors);
    }
    useEffect(() => {
        getDoctors()
    }, [])
    return (
        <>
            <div className='doclist-main'>
                <Sidebar/>
                <div className='doclist-body'>
                    <div className='search-bar'>
                    <Search placeholder="Search for your doctor" enterButton="Search" size="large"  />
                    </div>
                    <div className='doclist-body-row'>
                        {
                            doctor.map((item, index) => {
                                return (
                                    <DoctorCard data={item} key={index} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
