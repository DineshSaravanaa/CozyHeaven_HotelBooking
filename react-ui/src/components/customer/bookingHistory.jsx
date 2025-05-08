import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router'; 
import "./history.css"

function BookingHistory()
{
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => 
    {
      console.log('Fetching from:', `http://localhost:8080/api/booking/customer/${userId}`);
      try
      {
        const response = await axios.get(`http://localhost:8080/api/booking/customer/${userId}`);
        setBookings(response.data);
      }
      catch (error)
      {
        console.error('Failed to fetch bookings:', error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  return (
    <div>
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link"><Link to="/CustomerDashboard">Home</Link></li>
          <li className="link"><Link to="/hotel">Hotels</Link></li>
          <li className="link"><Link to="/service">Services</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
          <li className="link profile-icon"><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <div className="booking-history-container">
        <h2>Your Booking History</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
               <li key={booking.id} className="booking-card">
               <div className="booking-content">
                 <div>
                   <div><strong>Hotel:</strong> {booking.room?.hotel?.name}</div>
                   <div><strong>Room:</strong> {booking.room?.name}</div>
                   <div><strong>Check-in:</strong> {booking.checkIn}</div>
                   <div><strong>Check-out:</strong> {booking.checkOut}</div>
                   <div><strong>Amount:</strong> ₹{booking.totalAmount}</div>
                   <div><strong>Status:</strong> {booking.status}</div>
                 </div>
                 <div className="review-btn-container">
                   <button 
                     className="review-btn"onClick={() =>  navigate(`/review/${booking.id }`)} >
                     Write a Review
                   </button>
                   <button 
                     className="review-btn"onClick={() =>  navigate(`/cancel/${booking.id}`)} >
                     Cancellation Request
                   </button>
                 </div>
               </div>
             </li>             
            ))}
          </ul>
        )}
      </div>

      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>COZY HEAVEN</h3>
            <p>Your trusted hotel booking platform for a luxurious and comfortable stay.</p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <p><Link to="/CustomerDashboard">About Us</Link></p>
            <p><Link to="/contact">Contact</Link></p>
            <p><Link to="/faq">FAQ</Link></p>
          </div>
          <div className="footer__col">
            <h4>Follow Us</h4>
            <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></p>
            <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></p>
            <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></p>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2025 Cozy Heaven. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default BookingHistory;
