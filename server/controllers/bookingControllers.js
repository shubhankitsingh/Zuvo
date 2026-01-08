

import Bookings from "../models/Bookings.js"
import Car from "../models/Car.js";

// To check availabilty of the car at a given date
const checkAvailability =async (car, pickupDate, returnDate)=>{
    const bookings= await Bookings.find({
        car,
        pickupDate:{$lte:returnDate},// booking pickup date is before return date
        returnDate:{$gte:pickupDate},// booking return date is after pickup date
    })

    return bookings.length===0;
}

//Api to check availability of car for the given data and location

export const checkAvailabilityOfCar =async(req,res)=>{
    try {
        
        const {location, pickupDate,returnDate}= req.body;
        // fetching all the cars at the given locxation
        const cars=await Car.find({
            location,
            isAvailable:true
        })

        //check car availability for the given date range using promise
        const availableCarsPromise= cars.map(async(car)=>{
            const isAvailable= await checkAvailability(car._id, pickupDate, returnDate);
            return {...car._doc, isAvailable}
        })

        let availableCars= await Promise.all(availableCarsPromise);
        availableCars= availableCars.filter((car)=>car.isAvailable===true);
        res.json({success:true, cars:availableCars});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//Api to create bookings

export const createBooking = async(req,res)=>{
    try {
        const {_id,} =req.user;
        const {car,pickupDate, returnDate}= req.body;

        const isAvailable= await checkAvailability(car, pickupDate, returnDate);
        if(!isAvailable){
            return res.json({success:false,message:"Car is not available for the selected date range"});
        }

        const carDetails= await Car.findById(car);
        // calculate price based on no of days
        const start= new Date(pickupDate);
        const end= new Date(returnDate);
        const noOfDays= Math.ceil((end-start)/(1000*60*60*24))+1; //+1 to include both pickup and return date
        const price= noOfDays* carDetails.pricePerDay;

        await Bookings.create({car,owner:carDetails.owner,user:_id,pickupDate,returnDate,price});

        res.json({success:true,message:"Booking created successfully"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//Api to list user bookings

export const getUserBookings= async(req,res)=>{
    try {
        const {_id}= req.user;
        const bookings= await Bookings.find({user:_id}).populate('car'). sort({createdAt:-1});
        res.json({success:true,bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

// Api to get owner booking
export const getOwnerBookings= async(req,res)=>{
    try {
        if(req.user.role!=='owner') return res.json({success:false,message:"Access denied"});
        const {_id}= req.user;
        const bookings= await Bookings.find({owner:_id}).populate('car user').sort({createdAt:-1});
        res.json({success:true,bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

// API to change the booking status

export const changeBookingStatus= async(req,res)=>{
    try {
        const {_id}= req.user;
        const {bookingId,status}= req.body;
        const bookings= await Bookings.findById(bookingId);

        if(bookings.owner.toString()!==_id.toString()){
            return res.json({success:false,message:"You are not authorized to change the status of this booking"});
        }

        bookings.status=status;
        await bookings.save();
        res.json({success:true,message:"Booking status updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}