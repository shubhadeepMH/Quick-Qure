const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isDoctor:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]

    },
    seeNotification:{
        type:Array,
        default:[]
    }
})

module.exports= mongoose.model('users', userSchema)