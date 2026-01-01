import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Event listener for successful connection
        mongoose.connection.on('connected', ()=> console.log("MongoDB connected successfully"));

        await mongoose.connect(`${process.env.MONGODB_URI}/Zuvo`)
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default connectDB;