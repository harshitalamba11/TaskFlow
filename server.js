import mongoose from 'mongoose';
import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server is running on port 5000");
    })
})
.catch(console.error);