import mongoose from 'mongoose';
import app from './src/app.js';
import authRoutes from "./src/routes/authRoutes.js"
import dotenv from 'dotenv';
import express from "express";
app.use(express.json());
app.use("/api/auth", authRoutes);
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server is running on port 5000");
    })
})
.catch(console.error);