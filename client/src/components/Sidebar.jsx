import React, { useState, } from "react";
import './Sidebar.css'
import { userMenu, doctorSidebar, adminMenu } from '../data/MenuData'
import { useLocation, Link, useNavigate } from "react-router-dom";
import { message,Badge } from "antd";

const Sidebar = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)

    let sidebarMenu = auth.isAdmin ? adminMenu : auth.isDoctor ? doctorSidebar : userMenu

    const handleLogOut = () => {
        let ans = localStorage.clear()
        navigate('/logIn')
        message.success("Successfully logged out")
        //  document.location.reload();

    }
   

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <a href="#">Quick Cure</a>
                    
                    <i onClick={()=>navigate('/notifications')} class="fa-sharp fa-solid fa-bell " style={{ color: 'white',scale:'1',marginLeft:'1rem',marginBottom:'.8rem'}}></i>
                    <Badge count={auth.notification.length}>
                    </Badge>
                  
                    
                </div>
                <input className="menu-btn" type="checkbox" id="menu-btn" />

                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">

                    {
                        sidebarMenu.map((item, index) => {
                            // active className
                            const isActive = location.pathname === item.path;
                            return (
                                <Link to={item.path} key={index} id={index} className={`menu-item ${isActive ? 'active' : ''}`}>
                                    {/* <i className={`${item.icon} fa-xl`}></i> */}
                                    <p>{item.name}</p>
                                </Link>
                            )
                        })
                    }
                    <div onClick={handleLogOut} >
                        <p className='menu-item' style={{ color: 'red', marginBottom: '.6rem', cursor: "pointer", font: 'bold' }}>Log-Out</p>
                    </div>

                </ul>
            </nav>

        </>
    )
};

export default Sidebar;
