import React, { useState } from 'react'
import {assets ,menuLinks} from '../assets/assets.js'
import {Link, useLocation, useNavigate} from 'react-router-dom'

const Navbar= ({setShowLogin})=>{

    const location =useLocation(); // to store the previous location to change the color of visited page
    const [open,setOpen]= useState(false); // to toggle the menu in mobile view, initially its off
    const navigate=useNavigate(); // to navigate to the home page

    return (
        <div className={`flex justify-between items-center px-4 py-2 bg-light border-b border-borderColor ${location.pathname === '/' &&"bg-light"}`}>
        {/* Logo */}
        {/* Link is used to navigate to the home page without reloading the page */}
        <Link to='/'>
        <img src={assets.logo} alt="logo.png"  className='h-16' />
        </Link>

        {/* {mnul}==> menuLinks   already added this object in ../assets/assets.js*/}
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === '/'?"bg-light": "bg-white"} ${open? "max-sm:translate-x-0":"max-sm:-translate-x-full"}`}>
            {menuLinks.map((obj,index)=>(
                <Link key={index} to={obj.path}>
                {obj.name} {/* name will show here*/}
                </Link>
            ))}

            <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56'> {/* hideen->hidden on mobile screen but on large screen (lg) it will show flex*/}

                <input type="text" className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 hover:text-lg transition-all duration-350" placeholder='Search Cars'/>
                <img src={assets.search_icon} alt="search" />

            </div>

            <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                <button onClick={()=> navigate('/owner')} className="cursor-pointer ">Dashboard</button>
                <button onClick={()=>setShowLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">Login</button>

            </div>
        </div>
        {/* Button for toggleing menu in mobile view */}
        <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open?assets.close_icon: assets.menu_icon} alt="menu" /> {/* if open is true then close icon will show otherwise menu icon will show */}
        </button>
        </div>
    )
}

export default Navbar;