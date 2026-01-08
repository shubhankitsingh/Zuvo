import React, { useState } from 'react'
import {assets ,menuLinks} from '../assets/assets.js'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import {motion} from 'motion/react';
const Navbar= ({})=>{

    const {setShowLogin, user, logout, isOwner,axios,setIsOwner}= useAppContext(); // destructuring setShowLogin from props
    const location =useLocation(); // to store the previous location to change the color of visited page
    const [open,setOpen]= useState(false); // to toggle the menu in mobile view, initially its off
    const navigate=useNavigate(); // to navigate to the home page

    const changeRole = async ()=>{
        try {
            const {data}= await axios.post('/api/owner/change-role');
            if(data.success){
                setIsOwner(true);
                toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            
        }
    }
    return (
        <motion.div
        initial={{y:-20, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{duration:0.5}}
        className={`flex justify-between items-center px-4 py-2 bg-light border-b border-borderColor ${location.pathname === '/' &&"bg-light"}`}>
        {/* Logo */}
        {/* Link is used to navigate to the home page without reloading the page */}
        <Link to='/'>
        <motion.img 
        whileHover={{scale:1.05}}
        src={assets.logo} alt="logo.png"  className='h-16' />
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
                <button onClick={()=> isOwner? navigate('/owner'): changeRole()} className="cursor-pointer ">{isOwner?"Dashboard":"List Cars"}</button>

                <button onClick={()=>{user?logout():setShowLogin(true)}} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg">{user? 'Logout':'Login'}</button>

            </div>
        </div>
        {/* Button for toggleing menu in mobile view */}
        <button className="sm:hidden cursor-pointer" aria-label="Menu" onClick={()=> setOpen(!open)}>
            <img src={open?assets.close_icon: assets.menu_icon} alt="menu" /> {/* if open is true then close icon will show otherwise menu icon will show */}
        </button>
        </motion.div>
    )
}

export default Navbar;