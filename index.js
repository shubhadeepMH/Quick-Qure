const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const databaseConn = require('./db/connect')
const user = require('./db/userSchema')
const doctor = require('./db/DoctorSchema')
const appoinment = require('./db/appoinmentSchema')
const cors = require('cors')
const { findOne } = require('./db/userSchema')
const moment = require('moment')
// const path=require('path')

//dotenv config
dotenv.config()
databaseConn()

//rest object
const app = express();

//middleweares
app.use(express.json())
app.use(cors())

// static files
app.use(express.static(path.join(__dirname,'./Build/dist')))
app.get('*',(req,res)=>{
res.sendFile(path.join(__dirname,'./client/Build/index.html'))
})

//Routes

//Handle Registration
app.post('/register', async (req, res) => {
    let userExist = await user.findOne({ email: req.body.email });
    if (userExist) {
        res.send({ message: 'email alredy exist', success: false })
    } else {
        let newUser = new user(req.body);
        newUser = await newUser.save();
        res.send({ data: newUser, message: 'User registered', success: true });
    }

})
//Handle logIn
app.post('/logIn', async (req, res) => {

    let ifExist = await user.findOne({ email: req.body.email })
    if (!ifExist) {
        return res.send({ message: "Can not find user Please Register", success: false })
    }
    let loggedUser = await user.findOne({ email: req.body.email, password: req.body.password })
    if (!loggedUser) {
        return res.send({ message: "Wrong email or password", success: false })
    }
    res.send({ data: loggedUser, message: 'Successfully logged in', seccess: true })
})

// Apply as Doctor form
app.post('/apply-doctor', async (req, res) => {
    let newDoctor = await new doctor(req.body)
    await newDoctor.save()
    let adminUser = await user.findOne({ isAdmin: true })
    let notification = adminUser.notification;
    notification.push({
        type: "Applying doctor request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor acount`,
        data: {
            doctorId: newDoctor._id,
            name: newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath: '/all-doctors'
        }

    })
    adminUser = await user.findByIdAndUpdate(adminUser._id, { notification })
    res.send({
        message: "Applied succesfully",
        success: true
    })
})
//Update notification for Mark as read

app.post('/see-notification/:id', async (req, res) => {
    let getUser = await user.findById(req.params.id)
    let getNotification = getUser.notification;
    getUser.seeNotification.push(...getNotification);
    getNotification = [];
    let updatedNotification = await user.findByIdAndUpdate(getUser._id, { notification: getNotification, seeNotification: getUser.seeNotification })

    res.send({
        message: 'Updated successfully',
        success: true,
        data: updatedNotification
    })

})

//Delete see notifications
app.post("/delete-seeNotification/:id", async (req, res) => {
    // console.log(req.body._id);
    let getUser = await user.findById(req.params.id)
    getUser.seeNotification = [];
    afterUpdate = await user.findByIdAndUpdate(getUser._id, { seeNotification: getUser.seeNotification })
    res.send({
        message: "Notification deleted",
        success: true,
        data: afterUpdate
    })

})
// Get user data
app.get('/user-data/:id', async (req, res) => {
    let getUser = await user.findById(req.params.id)
    res.send(getUser)
})

//Get all  users 
app.get('/all-users', async (req, res) => {
    let getUsers = await user.find();
    res.send(getUsers)
})

//Get all doctors
app.get('/all-doctors', async (req, res) => {
    let getDoctors = await doctor.find()
    res.send(getDoctors)
})
//Approve Doctor to be doctor on this platform
app.post('/approve-doctor', async (req, res) => {
    let getDoctor = await doctor.findById(req.body._id)
    let getUser = await user.findById(getDoctor.userId)
    let userNotification = getUser.notification;
    let updateIsDoctor = await user.findByIdAndUpdate(getUser._id, { isDoctor: true })
    userNotification.push({
        message: getUser.name + " Your doctor request has approved",
    })
    let updateStatus = await doctor.findByIdAndUpdate(getDoctor._id, { status: 'Approved' })
    let updatedresp = await user.findByIdAndUpdate(getUser._id, { notification: userNotification })
    res.send({
        message: "approved succesfully",
        success: true,
        data: updatedresp
    })
})

//Block Doctor Approval

app.post('/block-doctor', async (req, res) => {
    let getDoctor = await doctor.findById(req.body._id)
    let getUser = await user.findById(getDoctor.userId)
    let userNotification = getUser.notification;
    let updateIsDoctor = await user.findByIdAndUpdate(getUser._id, { isDoctor: false })
    userNotification.push({
        message: getUser.name + " Your doctor request has cancelled",
    })
    let updateStatus = await doctor.findByIdAndUpdate(getDoctor._id, { status: 'pending' })
    let updatedresp = await user.findByIdAndUpdate(getUser._id, { notification: userNotification })
    res.send({
        message: "Blocked succesfully",
        success: true,
        data: updatedresp
    })
})
app.get('/doctor-profile/:id', async (req, res) => {
    let resp = await doctor.findOne({ userId: req.params.id });
    if (resp) {
        res.send(resp)
    }
})
//Get all doctors
app.get('/get-doctors', async (req, res) => {
    let getDoctors = await doctor.find({ status: "Approved" })
    if (getDoctors) {
        res.send(getDoctors)
    } else {
        res.send({ getDoctors: 'No doctor found' })
    }
})
    //Update profile
    app.post('/update-profile',async(req,res)=>{
            let getDoctor=await doctor.findOne({userId:req.body.userId})
            let ans=await doctor.findByIdAndUpdate(getDoctor._id,req.body)
            res.send({
                success:true,
                message:"Profile updated successfully",
                data:ans
            })
    })
//Booking Availability
app.post('/booking-availability', async (req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString()
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString()
        const getdoctorId = req.body.doctorId;
        const appointments = await appoinment.find({
            getdoctorId,
            date,
            time: {
                $gte: fromTime, $lte: toTime
            }
        })
        if (appointments.length > 0) {
            res.send({
                message: "Appointment Not Available at selected date and  time",
                success: false
            })
        }
        else{
            res.send({
                message:"Appoinment  Available at selected date and time",
                success:true,
            })
        }
    }
    catch (error) {
        console.log(error);
    }

})

//Book appointment Api

app.post('/book-appointment', async (req, res) => {

    req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
    req.body.time = moment(req.body.time, 'HH:mm').toISOString();
    let ans = new appoinment(req.body)//push appointment details appointment to dataBase
    ans = await ans.save();

    let getDoctor = await user.findOne({ _id: req.body.doctorId });//Finding doctor as user to send notification
    let getUser = await user.findOne({ _id: req.body.userId });
    let notification = getDoctor.notification;
    notification.push({
        title: 'A request for Appointment booking ',
        message: getUser.name + " has applied for book an Appointment"
    })
    await getDoctor.save();//Updating Doctor(user) after push notification
    if (ans) {
        res.send({
            success: true,
            message: 'Appointment booked successfully'
        })
    }
})
    //Get User appintments
app.get('/appointments/:userId',async(req,res)=>{
    try {
        // console.log(req.params.userId);
        const appointments=await appoinment.find({userId:req.params.userId})
        res.status(200).send({
            success:true,
            data:appointments,
        })
        
    } catch (error) {
        console.log(error);
    }
})

    //Get Doctors appointments
app.get('/doctor-appointments/:id',async(req,res)=>{
    try {
        // console.log(req.params.userId);
        // let getDoctor=await doctor.findOne({userId:req.params.id});
        // console.log(req.params.id);

        const appointments=await appoinment.find({doctorId:req.params.id})
        res.status(200).send({
            success:true,
            data:appointments,
        })
        
    } catch (error) {
        console.log(error);
    }
})

    //Approve  appointment as a doctor

    app.post('/approve-appointment',async(req,res)=>{
       
        let getUser= await user.findById(req.body.userId);
        let getDoctor= await user.findById(req.body.doctorId);
        let fetchAppointment=await appoinment.findById(req.body._id);

        getUser.notification.push({
            message:"Your Appintment has been approved by Dr. "+getDoctor.name,
            body:""
        })
        getUser.save();
        fetchAppointment.status='Approved'
       await fetchAppointment.save();
        res.send({
            success:true,
            message:fetchAppointment
        })


    })

    //Reject Appointment as doctor
    app.post('/reject-appointment',async(req,res)=>{
        let getUser= await user.findById(req.body.userId);
        let getDoctor= await user.findById(req.body.doctorId);
        let fetchAppointment=await appoinment.findById(req.body._id);

        getUser.notification.push({
            message:"Your Appintment has been Rejected by Dr. "+getDoctor.name,
            body:""
        })
        getUser.save();
        fetchAppointment.status='Rejected'
       await fetchAppointment.save();
        res.send({
            success:true,
            message:fetchAppointment
        })

    })

//port
const port = process.env.PORT || 3000

//listening at port
app.listen(port, () => {
    console.log("I am listening at port No :" + port + " On " + process.env.NODE_MODE + " mode");
})
