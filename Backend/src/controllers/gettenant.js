
import Tenant from '../models/Tenant.js';

const Gettenant=async (req,res)=>{
    try{
        const { id }=req.params;
        const tenant=await Tenant.findById(id).select('name');
        if(!tenant) return res.status(404).json({message:"Tenant not found"});
        return res.status(200).json(tenant);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default Gettenant;