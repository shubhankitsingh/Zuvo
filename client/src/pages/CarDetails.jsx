import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';

const carDetails = () => {

    const {id} =useParams();
    const navigate = useNavigate();
    const [car,setCar] = useState(null);

    useEffect(() => {
      setCar(dummyCarData.find((car)=>car._id===id))
    },[id])
    // If car is not found, loading...
  return car?(
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer' onClick={()=>(-1)}>
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        back to all cars
      </button>

      <div>
        
      </div>
    </div>
  ): <p> Loading...</p>
}

export default carDetails