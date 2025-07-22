import React, {useState} from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Footer from './components/Footer';
const App = () => {

  // creating props state to pass to Navbar
  const [showLogin,setShowLogin]= useState(false);
  const isOwnerPath= useLocation().pathname.startsWith('/owner'); //To hide navbar in owner dashboard
  return (
    <>
      {!isOwnerPath &&  <Navbar setShowLogin={setShowLogin}/>} {/* only show navbar when not on owner page*/}
      {/* Routes for different pages */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
      </Routes>
      {!isOwnerPath && <Footer/>} {/*footer willl show on all pages except the dashboard*/}
    </>
  )
}

export default App