import Projects from "../models/Project.js";
import mongoose from "mongoose";
// import Tasks from "../models/Task.js";

const GetProjects=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id);
        const count = await Projects.countDocuments({ 
            tenantId: new mongoose.Types.ObjectId(id) 
        });
        res.status(200).json({totalEntries: count});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
const GetProjectsMember = async (req, res) => {
    try {
        const { name } = req.params; // app.js ke :name se match karega
        console.log("Searching for worker:", name); 
        
        const count = await Projects.countDocuments({
            name: name // MongoDB field 'name' se match karega
        });
        
        res.status(200).json({ totalEntries: count });
    } catch (err) {
        console.error("Backend Error:", err.message);
        res.status(500).json({ message: err.message });
    }
}
export default {GetProjects,GetProjectsMember};