import mongoose from "mongoose";

const notificationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User"
    },
    tenantId:{type:mongoose.Schema.Types.ObjectId,ref:"Tenant"},
    message:String,
    isRead:{type:Boolean,default:false},
},
{timeStamps:true}
);

export default mongoose.model("Notification",notificationSchema);