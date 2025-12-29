import  TaskComment from "../models/taskCommentSchema.js";
import Task from "../models/Task.js";

export const taskComment=async(req,res)=>{
    const task=await Task.findOne({
        _id:req.params.taskId,
        tenantId:req.user.tenantId
    });
    if(!task){
        return res.status(403).json({ message: "Access denied or tenant not found!" });
    }
    const comment=await TaskComment.create({
        taskId:task._id,
        tenantId:req.user.tenantId,
        userId:req.user.userId,
        comment:req.body.comment
    });
    //  audit log
            await TaskActivity.create({
            taskId: task._id,
            tenantId: req.user.tenantId,
            action: "User commented on task",
            performedBy: req.user.userId
            });
    res.status(201).json(comment);
}

export const getComment=async(req,res)=>{
    try{
    const tasks=await Task.findOne({
        _id:req.params.taskId,
        tenantId:req.user.tenantId
    });
    if(!tasks){
        return res.status(403).json({
        message: "Access denied or task not found",
      });
    }
    const comments=await TaskComment.find({
        taskId:tasks._id,
        tenantId:req.user.tenantId,
    }).populate("userId","name email");
    if(!comments){
        res.status(404).json({message:"No comments found!"});
    }
    res.status(201).json(comments);
}
catch(err){
    res.status(500).json({ message: err.message });
}
}