const mongoose = require('mongoose')

const configs = require('../configs')

//ENV Parameter


const dbConnect = async() => {
   try{
      const connectionResult = await mongoose.connect(configs.connectionStr);
      
      
      if(connectionResult){
         console.log(`${configs.isCloud? "Connected to Cloud Atlas MongoDB" : "Connected to Local Docker MongoDB"}`);
      }

   }catch(err){
      (err)=> console.error('Connection failed',err);
      
   }
}


module.exports = dbConnect
/*

const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URI
if (!connectionString) {
    throw new Error("MONGO_URI is not defined");
}

const connectDB =  async() =>{
    mongoose.connect(connectionString)
     .then(()=>{
        console.log("Connection Successful")
     })
     .catch((error) =>{
        console.log(error);
      })
}

module.exports = connectDB

*/