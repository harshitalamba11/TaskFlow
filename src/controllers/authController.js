import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

//1.registering a tenant/company and admin
export const register=async(req,res)=>{
    try{
        const {companyName,name,email,password}=req.body;

        //lets check is it existing
        const existingUser=await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"Tenant Already Exists!"});
        }
        const existingTenant = await Tenant.findOne({ name: companyName });

        if (existingTenant) {
            return res.status(400).json({
                message: "Company already exists. Please login or request access.",
        });
}

        //mow lets create
        const tenant=await Tenant.create({ name:companyName })

        //hashing the password
        const hashpassword=await bcrypt.hash(password,10);

        //create the user
        const user=await User.create({
            tenantId:tenant._id,  //common as user can have data access of his company with tenantid
            name,
            email,
            password:hashpassword,
            role:"ORG_ADMIN",
        });

        //token creation
        const token=jwt.sign({
            userId:user._id,
            tenantId:tenant._id,
            role:user.role,
        
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

    res.status(201).json({token});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

    //2.registering a member of particular tenant
    export const registerUser=async(req,res)=>{
        try{
            const {companyName,name,email,password}=req.body;
            const tenant=await Tenant.findOne({name:companyName});
            if(!tenant){
                return res.status(404).json({
                    message:"Company not found. Please contact admin.",
                });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashpassword=await bcrypt.hash(password,10);
            const user=await User.create({
                tenantId:tenant._id,
                name,
                email,
                password:hashpassword,
                role:"MEMBER",
            });

            res.status(201).json({
                message: "User registered successfully. Please login.",
            });
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    };

//login-common for all
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = jwt.sign(
            {
                userId: user._id,
                tenantId: user.tenantId,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};