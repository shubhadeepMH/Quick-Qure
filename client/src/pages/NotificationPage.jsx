import { Button, message, Tabs } from 'antd'
import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function NotificationPage() {
    let auth = localStorage.getItem('user');
    auth = JSON.parse(auth)
    let navigate = useNavigate();

    //Remove notification array data to seenNotification array

    const markAsRead = async () => {
        //    console.log(auth._id);
        let getResp = await fetch(`http://localhost:3000/see-notification/${auth._id}`, {
            method: 'post',
            body: JSON.stringify({ _id: auth._id }),
            headers: {
                'Context-Type': 'application/json'
            }
        })
        getResp = await getResp.json()
        //Update localhost
        let getUser = await fetch(`http://localhost:3000/user-data/${auth._id}`)
        getUser = await getUser.json()
        localStorage.setItem('user', JSON.stringify(getUser))
        document.location.reload();

    }
    //Delete read Notifications
    const deleteNotification = async () => {
        let getResp = await fetch(`http://localhost:3000/delete-seeNotification/${auth._id}`, {
            method: 'post',
            body: JSON.stringify(auth._id),
            headers: {
                'Context-Type': "Application/json"
            }
        })
        getResp = await getResp.json()
        if (getResp.success) {
            message.success(getResp.message)
            // Update localhost
            let getUser = await fetch(`http://localhost:3000/user-data/${auth._id}`)
            getUser = await getUser.json()
            // console.log(getUser.data);
            localStorage.setItem('user', JSON.stringify(getUser))
            navigate('/')
        }
    }

    return (
        <div>
            <Sidebar />
            <div className='notification-main'>
                <h2>Notifications</h2>
                <hr></hr>
                <div className='notification-container'>
                    <Tabs>
                        <items tab="Unseen" key={0}>
                            <div className='button-container'>
                                <button onClick={markAsRead} type="button" className="btn">Mark as read</button>
                            </div>
                            <div className='notifications'>
                                <ul className="d-block list-group list-group-flush">
                                    {auth.notification.length != 0 ? auth.notification.map((item, index) => {
                                        {/* console.log(item) */ }
                                        return <Link key={index} to='/doctors'><li className="list-group-item"><span>{index + 1}||</span>{item.message}</li> </Link>
                                    }) : "No recent notifications"
                                    }


                                </ul>
                            </div>



                        </items>
                        <items tab="Seen" key={1}>
                            <div className='button-container'>
                                <button onClick={deleteNotification} type="button" className="btn">Delete </button>
                            </div>
                            <div className='notifications'>
                                <ul className="list-group list-group-flush">
                                    {auth.seeNotification.length != 0 ? auth.seeNotification.map((item, index) => {
                                        {/* console.log(item) */ }
                                        return <Link key={index} to='/doctors'> <li key={index} className="list-group-item"><span>{index + 1}</span>||{item.message}</li></Link>
                                    }) : "No notification as marked"
                                    }
                                </ul>
                            </div>
                        </items>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}

