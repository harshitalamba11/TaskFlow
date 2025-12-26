import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
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
        description:{
            type:String,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    },
    { timestamps:true }
);

export default mongoose.model('Project', projectSchema);