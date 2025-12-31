import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import TaskActivity from "../models/TaskActivity.js";

export const dashboard=async(req,res)=>{
    const tenantId=req.user.tenantId;
    const users=await User.countDocuments({tenantId});
    const totalProjects=await Project.countDocuments({tenantId});
    const totaltasks=await Task.countDocuments({tenantId});
    const completedtasks=await Task.countDocuments({
        tenantId,status:"done"
    });
    
    await TaskActivity.create({
            // taskId: task._id,
            tenantId: req.user.tenantId,
            action: "Dashboard viewed",
            performedBy: req.user.userId
    });
    res.status(200).json({
        users,totalProjects,totaltasks,completedtasks
    });
}