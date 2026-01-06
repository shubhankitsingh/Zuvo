import jwt from "jsonwebtoken";
import User from "../models/user.js";


// Middleware to protect routes
export const protect =async(req,res,next)=>{
    // Get token from headers
    const token=req.headers.authorization;
    // Check if token exists
    if(!token){
        return res.json({success:false,message:"not authorized"});
    }
    // Verify token
    try {
        const userId = jwt.decode(token, process.env.JWT_SECRET);

        if(!userId) return res.json({success:false,message:"not authorized"});

        req.user= await User.findById(userId).select("-password"); // exclude password field

        next(); // proceed to next route handler (generateUserDat)
    } catch (error) {
        return res.json({success:false,message:"not authorized"});
    }
}