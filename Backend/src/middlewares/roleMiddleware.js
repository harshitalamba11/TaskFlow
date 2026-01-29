export const adminaccess=(req,res,next)=>{
    if(req.user.role!=="ORG_ADMIN"){
        return res.status(403).json({message:"Admin access required"});
    }
    next();
};