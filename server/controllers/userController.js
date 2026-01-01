// Contoling user-related operations, routes will call these functions

import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken=(userId)=>{
    const payload=userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export const registeredUser = async(req,res)=>{
    try {
        const {name,email,password}= req.body;
        // Basic input validation
        if(!name ||!email ||!password || password.length<6){
            return res.json({success:false,message:"Invalid input data. Password must be at least 6 characters long."});
        }
        // Check if user already exists
        const userExists= await User.findOne({ email });
        if(userExists){
            return res.json({success:false,message:"User already exists with this email."});
        }
        // Hash the password before saving 
        const hashedPassword= await bcrypt.hash(password,10);

        // Create new user
        const user =await User.create({
            name,
            email,
            password:hashedPassword
        });

        // Respond with success message and generate token usign JWT
        const token=generateToken(user._id.toString());
        res.json({success:true,token});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

// Login existing user

export const loginUser= async(req,res)=>{
    try {
        const {email,password}= req.body;
        // Basic input validation
        if(!email ||!password){
            return res.json({success:false,message:"Invalid input data."});
        }
        const user= await User.findOne({ email });
        if(!user){
            return res.json({success:false,message:"User does not exist with this email."});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Incorrect password."});
        }
        // Generate token
        const token=generateToken(user._id.toString());
        res.json({success:true,token});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}