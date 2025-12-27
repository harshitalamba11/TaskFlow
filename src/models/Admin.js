import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

export default mongoose.model('Admin', adminSchema);