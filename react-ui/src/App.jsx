import { Route, Routes } from "react-router"
import Login from "./components/auth/Login"
import CustomerDashboard from "./components/customer/CustomerDashboard"
import CustomerSignUp from "./components/customer/signup"
import Booking from "./components/customer/booking"
import Service from "./components/customer/service"
import ContactUs from "./components/customer/contact"
import Hotels from "./components/customer/hotel"
import HotelRooms from "./components/customer/rooms"
import Payment from "./components/customer/payment"
import Profile from "./components/customer/profile"
import BookingHistory from "./components/customer/bookingHistory"
import SubmitReview from "./components/customer/review"
import Cancellation from "./components/customer/cancel"


function App() 
{ 

  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/customer/signup" element={<CustomerSignUp />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/service" element={<Service />} />
      <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/hotel" element={<Hotels />} />
      <Route path="/rooms/:hotelId" element={<HotelRooms />} />
      <Route path="/booking/:roomId" element={<Booking />} />
      <Route path="/payment/:bookingId" element={<Payment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/bookingHistory" element={<BookingHistory />} />
      <Route path="/review/:bookingId" element={<SubmitReview />} />
      <Route path="/cancel/:bookingId" element={<Cancellation />} />
    </Routes>
  )
}

export default App
