import { format } from "path";
import imagekit from "../configs/imagekit.js";
import User from "../models/user.js";

import fs from "fs"; //importing file system module to read file buffer
import Car from "../models/Car.js";
import Bookings from "../models/Bookings.js";
import { tracingChannel } from "diagnostics_channel";


//APi to change role to owner

export const changeRoleToOwner = async (req,res)=>{
    try {
        const {_id}= req.user;
        await User.findByIdAndUpdate(_id,{role:"owner"});
        res.json({success:true,message:"Role updated to owner"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//API to list Car

export const addCar= async(req,res)=>{
    try {
        
        const {_id}= req.user;
        let car =JSON.parse(req.body.carData);
        const imageFile =req.file;
        // Uploading image to Imagekit for optimization

        const fileBuffer= fs.readFileSync(imageFile.path); //reading file buffer using fs module

        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/cars'
        });

        //getting image url after uploading to imagekit  / optimazation
        var optimizedImageURL=imagekit.url({
            path:response.filePath,
            transformation:[
                {"width":'1280'},
                {quality:'auto'},
                {format:"webp"} // webp is supported in all browsers and provide better compression
            ]
        })

        const image=optimizedImageURL;
        
        //uploading image details to database
        await Car.create({
            ...car,
            owner:_id,
            image
        })

        res.json({success:true,message:"Car added successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// Api to list owner cars

export const getOwnerCars =async(req,res)=>{
    try {
        const {_id} =req.user
        const cars = await Car.find({owner:_id});
        res.json({success:true,cars});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to toggle car availability

export const toggleCarAvailability = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {carId}= req.body;
        const car = await Car.findById(carId);
        
        // checking if car belong to user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false,message:"You are not authorized to change availability of this car"});
        }
        car.isAvailable=!car.isAvailable;
        car.save();

        res.json({success:true,message:"Car availability updated successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }  
}

// Api to delete a car

export const deleteCar = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {carId}= req.body;
        const car = await Car.findById(carId);
        
        // checking if car belong to user
        if(car.owner.toString() !== _id.toString()){
            return res.json({success:false,message:"You are not authorized to change availability of this car"});
        }
        car.owner=null; //setting owner to null instead of deleting car permanently
        // if someone has rented the car, we can keep the record for future reference
        car.isAvailable=false; //making car unavailable
        car.save();

        res.json({success:true,message:"Car removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }  
}

// API to get Dashboard data

export const getDashboardData= async (req,res)=>{
    try {
        const {_id, role} = req.user;
        if(role!=='owner'){
            return res.json({success:false,message:"Only owners can access dashboard data"});
        }
        const car=await Car.find({owner:_id});
        const bookings= await Bookings.find({owner:_id}).populate('car').sort({createdAt:-1});

        const pendingBookings= Bookings.find({owner:_id, status:"pending"});
        const confirmedBookings= Bookings.find({owner:_id, status:"confirmed"});
        const cancelledBookings= Bookings.find({owner:_id, status:"cancelled"});

        //monthly revernue
        const monthlyRevenues= bookings.slice().filter(booking=>booking.status==='confirmed').reduce((acc,booking)=> acc+booking.price,0);

        const dashboardData={
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            confirmedBookings: confirmedBookings.length,
            recentBookings: bookings.slice(0,3), // getting 5 most recent bookings
            monthlyRevenues
        }
        res.json({success:true,dashboardData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


// Api to update user PP

export const  updateProfilePicture= async(req,res)=>{
    try {
        const {_id} =user.req;

        const imageFile =req.file;
        // Uploading image to Imagekit for optimization

        const fileBuffer= fs.readFileSync(imageFile.path); //reading file buffer using fs module

        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:'/users'
        });

        //getting image url after uploading to imagekit  / optimazation
        var optimizedImageURL=imagekit.url({
            path:response.filePath,
            transformation:[
                {"width":'400'},
                {quality:'auto'},
                {format:"webp"} // webp is supported in all browsers and provide better compression
            ]
        })

        const image=optimizedImageURL;
        
        //uploading image details to database
        await User.findByIdAndUpdate(_id,{image});

        res.json({success:true,message:"Profile picture updated successfully", image});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}