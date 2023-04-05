const mongoose=require('mongoose');

//connect
const databaseConn= async()=>{
      const connect=await  mongoose.connect(process.env.CONNECT_DB)
      console.log("I am connected to DataBase");
}
module.exports=databaseConn