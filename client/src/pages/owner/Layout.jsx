import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        {/* Top navigation bar for owner dashboard */}
        <NavbarOwner />
        
        {/* Main content area with sidebar and page content */}
        <div className='flex flex-1'>
            {/* Left sidebar with navigation */}
            <Sidebar/>
            
            {/* Main content area where child routes render */}
            <div className='flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout