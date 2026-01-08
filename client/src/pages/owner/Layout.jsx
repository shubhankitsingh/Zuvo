import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

/**
 * Layout component for the owner dashboard
 * Provides the main layout structure with navbar, sidebar, and content area
 * Also handles authentication check to ensure only owners can access this layout
 */
const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  /**
   * Effect hook to protect owner routes
   * Redirects non-owner users to the home page
   */
  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='flex flex-col'>
      <NavbarOwner />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout