import express from 'express';
const app=express();

import cors from 'cors';
app.use(cors());
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("TASKFLOW API RUNNING");
})

export default app;