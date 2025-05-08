import { Route, Routes } from "react-router"
import Login from "./components/auth/Login"
import OwnerDashboard from "./components/owner/OwnerDashboard"
import HotelOwnerDashboard from "./components/owner/OwnerDashboard"
import Signup from "./components/auth/SignUp"
import BookingsPage from "./components/owner/Bookings"
import MyHotelsPage from "./components/owner/MyHotels"
import AddEditHotel from "./components/owner/AddEditHotel"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import fetchUser from "./components/store/userAction"
import ProfilePage from "./components/owner/Profile"
import Cancellations from "./components/owner/Cancellations"
import ReviewsDashboard from "./components/owner/Reviews"
import PendingRequests from "./components/owner/PendingRequests"

function App(){
  const dispatch = useDispatch()
  useEffect(()=>{

    dispatch(fetchUser())

  },[dispatch])
  return(
   <Routes>
    <Route index path="" element={<Login/>}/>
    <Route path="owner-dashboard" element={<OwnerDashboard/>}/>
    <Route path="signup" element={<Signup/>}/>
    <Route path="booking" element={<BookingsPage/>}/>
    <Route path="myhotels" element={<MyHotelsPage/>}/>
    <Route path="add-edit-hotel" element={<AddEditHotel/>}/>
    <Route path="profile" element={<ProfilePage/>}/>
    <Route path="cancellations" element={<Cancellations/>}/>
    <Route path="reviews" element={<ReviewsDashboard/>}/>
    <Route path="pending-requests" element={<PendingRequests/>}/>
    <Route path="login" element={<Login/>}/>
   </Routes>
  )
}
export default App