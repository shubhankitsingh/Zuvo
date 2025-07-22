import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import Title from './Title'
const Hero = () => {
    const [pickupLocation, setPickupLocation]= useState("");
    const [pickupDate, setPickupDate] = useState("");
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-14 bg-light text-center'>
        <div>
            <h1 className='text-4xl md:text-5xl font-semibold'>Welcome to Zuvo</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-156'> 
                Your one-stop solution for car rentals
            </p>
        </div>

        <form className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
            <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
                <div className="flex flex-col items-start gap-2">
                    <p >{pickupLocation? 'Pickup Location': 'Please Select Location'} </p>
                    <select className="px-1 text-sm text-gray-500" required value={pickupLocation} onChange={(e)=> setPickupLocation(e.target.value)}>
                        <option value="">Pickup Location</option>
                        {cityList.map((city, index) => (
                            <option value={city} key={index}>{city}</option>
                        ))}
                    </select>
                    
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="PickupDate">Pickup Date</label>
                    <input onChange={(e)=> setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" required />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <label htmlFor="returnDate">Return Date</label>
                    <input type="date" id="return-date" min={pickupDate? pickupDate:new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" required />
                </div>
               

            </div>
             <button className='flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer hover:text-lg transition-all duration-350'>

                    <img src={assets.search_icon} alt="search" className="brightness-300 " />
                    Search
                </button>
        </form>
        <img src={assets.main_car} alt="car" />
    </div>
  )
}

export default Hero
