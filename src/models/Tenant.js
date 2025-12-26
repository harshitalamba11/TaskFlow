import mongoose from 'mongoose';
const userSchema=new mongoose.Schema(
    {
        tenantId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tenant',
            required:true,
            index:true,
        },
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            index:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:['ORG_ADMIN','MEMBER'],
            default:'MEMBER',
        },
    },
    { timestamps:true}
);

export default mongoose.model('User',userSchema);