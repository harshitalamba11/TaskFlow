export const tenatAcess=(req,res,next)=>{
    const tenantIdFromParams=req.user.tenantId;
    const tenantIdFromToken=req.user.tenantId;
    if(tenantIdFromParams && tenantIdFromParams!==tenantIdFromToken){
        return res.status(403).json({
            message: "Access denied to another tenant's data",
        });
    }
    next();
}