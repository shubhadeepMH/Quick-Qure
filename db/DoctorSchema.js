const mongoose =require('mongoose')

let DoctorSchema=new mongoose.Schema({
    userId:String,
    firstName:String,
    lastName:String,
    mobileNumber:Number,
    email:String,
    address:String,
    specialization:String,
    experiance:String,
    fees:Number,
    status:{
        type:String,
        default:"pending"
    },
    timing:Object

},{timestamps:true})
module.exports=mongoose.model('doctors',DoctorSchema)