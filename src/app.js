import express from 'express';
const app=express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

import Tenant from "./models/Tenant.js";
app.use('/test-tenant',async(req,res)=>{
    // const tenant=await Tenant.create({name:"Test Tenant"});
    res.json("tenant");
});

app.get('/',(req,res)=>{
    res.send("TASKFLOW API RUNNING");
})

export default app;