import e from "express";
import mongoose, { mongo } from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    role : { type: String,enum: ["owner","user"], default: "user" },
    image : { type: String,default: ''},
}, { timestamps: true });

// Create User Model
const User= mongoose.model('User', userSchema);

export default User;