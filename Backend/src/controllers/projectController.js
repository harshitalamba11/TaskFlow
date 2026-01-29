import Project from "../models/Project.js";

export const createProject=async(req,res)=>{
    try{
        const {name,description}=req.body;
        const project=await Project.create({
            tenantId:req.user.tenantId,
            name,
            description,
            createdBy:req.user.userId
        });
        await TaskActivity.create({
            taskId: task._id,
            tenantId: req.user.tenantId,
            action: "Project Created",
            performedBy: req.user.userId
            });
        res.status(201).json(project);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};
export const getProject=async(req,res)=>{
    try{
        const projects=await Project.find({
            tenantId:req.user.tenantId,
        })
        res.json(projects);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}