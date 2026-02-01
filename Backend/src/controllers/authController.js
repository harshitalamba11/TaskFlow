import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Task from "../models/Task.js";
import Tenant from "../models/Tenant.js";
import TaskActivity from "../models/TaskActivity.js";
import User from "../models/User.js";
// import Admin from "../models/Admin.js";

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
            companyName,
            name,
            email,
            password:hashpassword,
            role:"ORG_ADMIN",
        });

        //token creation
        const token=jwt.sign({
            userName:name,
            company:companyName,
            userId:user._id,
            tenantId:tenant._id,
            role:user.role,
        
        },
        process.env.JWT_SECRET,
        {expiresIn:"20d"}
    );
        await TaskActivity.create({
            action: "Tenant Registered",
            performedBy: user._id, 
            tenantId: tenant._id,
            details: `Company ${companyName} registered by ${name}`
        });

        res.status(201).json({ token, user: { id: user._id, name: user.name } });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

    //2.registering a member of particular tenant
    export const registerUser=async(req,res)=>{
        try{
            const {companyName,name,email,role,password}=req.body;
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
                role:role,
            });

            res.status(201).json({
                message: "User registered successfully. Please login.",
            });
            // await TaskActivity.create({
            // taskId: task._id,
            // tenantId: req.user.tenantId,
            // action: "New User Registered",
            // performedBy: req.user.userId
            // });
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
                userName: user.name,
                company:user.companyName,
                userId: user._id,
                tenantId: user.tenantId,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        // await TaskActivity.create({
        //     taskId: task._id,
        //     tenantId: req.user.tenantId,
        //     action: "User Signin",
        //     performedBy: req.user.userId
        //     });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const employees=async(req,res)=>{
    try{
        const {id}=req.params;
        const count=await User.countDocuments({tenantId:id,role:'MEMBER'});
        return res.status(200).json({totalEntries:count});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

export const manager=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.findOne({_id:id});
        if(!user){
            return res.status(404).json({ message: "User doesn't exists!" });
        }
        // console.log(user.role);
        if(user.role==='ORG_ADMIN') return res.status(404).json({ message: "No superior authority!" });
        // console.log(user.tenantId);
        const tenant=await User.findOne({tenantId:user.tenantId,role:'ORG_ADMIN'});
        return res.status(200).json({Manager:tenant.name});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}