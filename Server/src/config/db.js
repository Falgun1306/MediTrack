import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async ()=>{
    try{
       await mongoose.connect(env.MONGODB_URL);
       console.log("Database connected successfully");
    }catch{
       console.log("Database connection failed");
       process.exit(1);  
    }
}

export default connectDB;