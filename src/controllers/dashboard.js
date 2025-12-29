import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const dashboard=async(req,res)=>{
    const tenantId=req.user.tenantId;
    const users=await User.countDocuments({tenantId});
    const totalProjects=await Project.countDocuments({tenantId});
    const totaltasks=await Task.countDocuments({tenantId});
    const completedtasks=await Task.countDocuments({
        tenantId,status:"done"
    });
    res.status(200).json({
        users,totalProjects,totaltasks,completedtasks
    });
}