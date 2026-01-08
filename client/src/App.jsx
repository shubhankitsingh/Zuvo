import React, {useState} from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Footer from './components/Footer';
import Layout from './pages/owner/Layout';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBooking from './pages/owner/ManageBooking';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
const App = () => {

  // creating props state to pass to Navbar
  const {showLogin} =useAppContext();
  const isOwnerPath= useLocation().pathname.startsWith('/owner'); //To hide navbar in owner dashboard
  return (
    <>
      {/* Toaster component to display toast notifications */}
      <Toaster />
      
      {/* Only show login component when showLogin is true */}
      {showLogin && <Login/>}

      {!isOwnerPath &&  <Navbar />} {/* only show navbar when not on owner page*/}
      {/* Routes for different pages */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />

        <Route path='/owner' element ={<Layout/>}>
        <Route index element ={<Dashboard/>}/>
        <Route path='manage-cars' element={<ManageCars/>} />
        <Route path='add-car' element={<AddCar/>} />
        <Route path='manage-bookings' element={<ManageBooking/>} />
        </Route>
        
      </Routes>
      {!isOwnerPath && <Footer/>} {/*footer willl show on all pages except the dashboard*/}
    </>
  )
}

export default App