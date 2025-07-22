import React from 'react'
import Title from './Title'
import {assets, dummyCarData} from '../assets/assets' // Assuming you have a dummy data file
import CarCards from './CarCards'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {
  const navigate= useNavigate();
  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
        <div>
            <Title title='Featured Vehicles' subTitle='Explore our selected vehicle only for you'/>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
          {  dummyCarData.slice(0,6).map((car)=>(
              <div key={car._id}>
                <CarCards car={car}/> {/* car card for every car in dummyCarData */}
              </div>
            ))
          }
        </div>
        <button className='flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer' onClick={()=>{
          navigate('/cars'); scrollTo(0,0) // Scroll to top when navigating x=0,y=0
        }}>
          Explore all cars <img src={assets.arrow_icon} alt="arrow" />
        </button>
    </div>
  )
}

export default FeaturedSection