const mongoose=require('mongoose')

const appointment= new mongoose.Schema({

    userId:String,
    doctorId:String,
    doctorInfo:String,
    userInfo:String,
    date:String,
    status:{
        type:String,
        default:'Pending'
    },
    time:{
        type:String,
        require:true,
    }
},{timestamps:true})

const appointmentModel=new mongoose.model('appointments',appointment)
module.exports=appointmentModel;