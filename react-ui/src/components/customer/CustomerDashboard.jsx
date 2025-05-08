import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import "./style.css"; 
import axios from "axios";

function CustomerDashboard() 
{
  const [searchLocation, setSearchLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [hotels, setHotels] = useState([]);
  const [originalHotels, setOriginalHotels] = useState([]);

  useEffect(() =>{
     const getPopular = async () => {
       let response =  await axios.get("http://localhost:8080/api/hotel/getAll")
       setOriginalHotels(response.data)
       let filtered = response.data.filter(h=>h.starRating>=4.0)
       setHotels(filtered);
     }
     getPopular()
  },[])

  const handleSearch = (e) => 
  {
    e.preventDefault()
    const filtered = hotels.filter(h => h.city == searchLocation)
    setHotels(filtered)
  };

  const handleReset = (e) =>
  {
    e.preventDefault()
    setSearchLocation("")
    setCheckIn("")
    setCheckOut("")
    setHotels(originalHotels)
  }

  const clients = [
    { id: 1, img: "https://randomuser.me/api/portraits/women/44.jpg", text: "The booking process was seamless, and the confirmation was instant. I highly recommend Cozy Heaven for hassle-free hotel bookings." },
    { id: 2, img: "https://randomuser.me/api/portraits/men/65.jpg", text: "The website provided detailed information about hotels, including amenities and photos, which helped me make an informed decision." },
    { id: 3, img: "https://randomuser.me/api/portraits/women/53.jpg", text: "I was able to book a room within minutes, and the hotel exceeded my expectations. I appreciate Cozy Heaven's efficiency and reliability." },
  ];  
  
  return (
    <div>
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <Link to="/hotel">Hotels</Link>
          </li>
          <li className="link">
            <Link to="/service">Services</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="link">
            <Link to="/bookingHistory">bookingHistory</Link>
          </li>
          <li className="link profile-icon">
             <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book hotels & stay packages at the lowest price.</p>
          </div>
        </div>
      </header>

      {/* Search Filter Section */}
      <section className="section__container search__container">
        <h2 className="section__header">Find Your Perfect Stay</h2>
        <form className="search__form" onSubmit={(e)=>{handleSearch(e)}}>
          <div className="input__group">
            <input id="location" type="text" placeholder="Search by location (e.g., Mumbai)" value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}/>
          </div>
          <div className="input__group">
            <input id="checkin" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
              aria-label="Check-in Date" 
            />
          </div>
          <div className="input__group">
            <input id="checkout" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
              aria-label="Check-out Date"/>
          </div>
           <button type="submit" className="search__btn" onClick={(e) => {handleSearch(e)}}>Search</button>
           <button type="submit" className="search__btn" onClick={(e) => {handleReset(e)}}>Reset</button>
        </form>
      </section>

      {/* Popular Hotels Section */}
      <section className="section__container popular__container">
        <h2 className="section__header">Popular Hotels</h2>
        <div className="hotels__grid">
          {hotels.length > 0 ? (
            hotels.slice(0, 6).map((hotel) => (
              <div key={hotel.id} className="hotel__card">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Hotel Room" className="img-fluid" />
                <div className="hotel__content">
                  <h3>{hotel.name}</h3>
                  <p><i className="ri-map-pin-line"></i> {hotel.address},{hotel.description}, {hotel.city}, {hotel.state}, {hotel.country} - {hotel.zip}</p>
                  <div className="hotel__services">
                    {hotel.commonAmenities &&
                      hotel.commonAmenities.split(",").map((amenity, index) => (
                        <span key={index} className="hotel__service">{amenity.trim()}</span>
                      ))}
                  </div>
                  <div className="hotel__details">
                    <div className="hotel__rating">⭐ {hotel.starRating}</div>
                    <div className="hotel__contact">
                      <p><strong>Phone:</strong> {hotel.contact}</p>
                      <p><strong>Email:</strong> {hotel.contactEmail}</p>
                    </div>
                  </div>
                  <Link to={`/hotel/${hotel.id}/rooms`}>
                    <button className="btn btn-primary w-100 mt-3">View Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels found for this search.</p>
          )}
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="client">
        <div className="section__container client__container">
          <h2 className="section__header">What Our Clients Say</h2>
          <div className="client__grid">
            {clients.map((client) => (
              <div className="client__card" key={client.id}>
                <img src={client.img} alt={`Client review ${client.id}`} />
                <p>{client.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="section__container">
        <div className="reward__container">
          <p>100+ Discount Codes Available</p>
          <h4>Join rewards and discover amazing discounts on your booking</h4>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section__container footer__container">
            <div className="footer__col">
                <h3>COZY HEAVEN</h3>
                <p>
                Your trusted hotel booking platform for a luxurious and comfortable stay.
                </p>
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

export default CustomerDashboard;