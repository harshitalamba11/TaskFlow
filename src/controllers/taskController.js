import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const createTask=async(req,res)=>{
    try{
        const {projectId,title,description,assignedTo}=req.body;
        const project=await Project.findOne({
            _id:projectId,
            tenantId:req.user.tenantId,
        });
        if(!project){
            return res.status(404).json({
                message:"Project not found"
            });
        }
        const task=await Task.create({
            tenantId:req.user.tenantId,
            projectId,
            title,
            description,
            assignedTo,
            createdTo:req.user.userId,
        });
        res.status(201).json(task);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};

// GET TASKS BY PROJECT (TENANT SAFE)
export const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      projectId: req.params.projectId,
      tenantId: req.user.tenantId,
    }).populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
