import { useState, } from 'react'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Registration from './pages/Registration'
import LogIn from './pages/LogIn'
import './App.css'
import PrivateComponent from './components/PrivateComponent'
import PublicComponent from './components/PublicComponent'
import ApplyDoctor from './pages/ApplyDoctor'
import NotificationPage from './pages/NotificationPage'
import Allusers from './pages/Admin/Allusers'
import Alldoctors from './pages/Admin/Alldoctors'
import Profile from './pages/Profile'
import DocList from './pages/DocList'
import CheckAvailability from './pages/CheckAvailability'
import Appointments from './pages/Appointments'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'


function App() {


  return (
    <BrowserRouter>

    <Routes>

   <Route element={<PrivateComponent/>}>
    <Route path='/' element={<Home/>}/>
    <Route path='/apply-doctor' element={<ApplyDoctor/>}/>
    <Route path='/notifications' element={<NotificationPage/>}/>
    <Route path='/all-users' element={<Allusers/>}/>
    <Route path='/all-doctors' element={<Alldoctors/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/doctor-list' element={<DocList/>}/>
    <Route path='/check-availability/:id' element={<CheckAvailability/>}/>
    <Route path='/appointments' element={<Appointments/>}/>
    <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
    </Route>
    
    <Route element={<PublicComponent/>}>
    <Route path='/register' element={<Registration/>}/>
    <Route path='/logIn' element={<LogIn/>}/>
    </Route>

    </Routes>

    </BrowserRouter>

  )
}

export default App
