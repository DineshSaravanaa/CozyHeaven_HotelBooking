import { Link } from "react-router";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard () {
  const [bookings,setBookings] = useState([])
  const [recentBookings,setRecentBookings] = useState([])
  const [approvedHotels,setApprovedHotels] = useState([])
  const [amount,setAmount] = useState([])
  const [pendingApproval,setPendingApproval]=useState([])
  const [deleteRequested,setDeletionRequested]=useState([])
  const [cancellations,setCanellations]=useState([])
  const [hotels,setHotels]=useState([])

  useEffect(()=>{

    const getItems = async () => {
      try {

        let token = localStorage.getItem('token')
        let header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        {/* 1) Get All Bookings From GET API (Get Bookings By Owner) And 
            2) Assign Bookings & Recent Bookings(sort by decending & slice into 5)
            3) Set Amount By Using Reduce in The Response Data */}

        let response = await axios.get('http://localhost:8083/api/hotel/bookingbyowner/all', header)
        
        setBookings(response.data)
        setRecentBookings(response.data.sort((a,b)=>b.id - a.id ).slice(0,5))
        const amount = response.data.reduce((sum,b)=>sum+Number(b.toatlAmount),0)
        setAmount(amount) 


         {/* 1) Get Hotels From GET API (Get Hotel By Owner)
             2) Filter The Response Data And Set Approved , Pending , Deletions */}

        let response1 = await axios.get('http://localhost:8083/api/hotel/getbyowner', header)
        setHotels(response1.data)
        const approved = response1.data.filter(hotel=>hotel.status == "APPROVED")
        setApprovedHotels(approved)
        const pending = response1.data.filter(hotel=>hotel.status == "PENDING")
        setPendingApproval(pending)
        const deletions = response1.data.filter(hotel=>hotel.deletionRequested == "Yes")
        setDeletionRequested(deletions)
        
        {/* 1) Get Cancellation Requests From GET API (Get Cancellations By Owner)
            2) Filter By Requested And Set Request  */}
  
        let response2 = await axios.get("http://localhost:8083/api/cancellationrequest/getbyhotelowner/all", header)
        setCanellations(response2.data)
      

    }
    catch (err) {
        console.log(err)
    }
    }

    getItems()

    
  },[])

  return (
      <div> 

      <Navbar />

      <div className="container">
        {/* Dashboard Section */}
        <div className="page-header">
          <h1 id="page-title">Dashboard</h1>
          <div className="breadcrumb">
          <Link to="/owner-dashboard">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span id="current-page">Dashboard</span>
          </div>
        </div>

        <div className="tab-content active">
          <div className="stats-grid">
            <div className="stat-card total"><h3>Total Bookings</h3><p>{bookings.length}</p></div>
            <div className="stat-card total"><h3>Total Hotels</h3><p>{hotels.length}</p></div>
            <div className="stat-card approved"><h3>Approved Hotels</h3><p>{approvedHotels.length}</p></div>
            <div className="stat-card revenue"><h3>Revenue</h3><p>${amount}</p></div>
            <div className="stat-card reviews"><h3>Cancellation Requests</h3><p>{cancellations.length}</p></div>
            <div className="stat-card pending"><h3>Pending Approval</h3><p>{pendingApproval.length}</p></div>
            <div className="stat-card requests"><h3>Deletion Requests</h3><p>{deleteRequested.length}</p></div>
          </div>

          <div className="recent-activity">
            <h2>Recent Bookings</h2>

              {
                recentBookings.map((b,index)=>(
                
            <div className="activity-item" key={index}>
                  <div className="activity-icon booking"><i className="fas fa-calendar-check"></i></div>
                  <div className="activity-details">
                    <div className="activity-title">New Booking Received</div>
                    <div className="activity-description">Booking #{b.id} for "{b.room?.hotel?.name}"</div>
                  </div>
                  <div className="activity-time">{b.bookedAt}</div>
                  </div>
                ))
              }
             
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard
