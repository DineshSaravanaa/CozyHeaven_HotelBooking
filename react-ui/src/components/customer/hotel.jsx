import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./hotels.css";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    fetchAllHotels(page);
  }, [page]);

  const fetchAllHotels = async (pageNumber = 0) =>
  {
    const response = await axios.get(`http://localhost:8080/api/hotel/getall?page=${pageNumber}&size=3`);
    try
    {
      setHotels(response.data.content);
      setTotalPages(response.data.totalPages);
    }
    catch (error)
    {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearch = async () => {
    try {
      let response = null;
  
      if (searchTerm) 
      {
        response = await axios.get(`http://localhost:8080/api/hotel/getbyname?name=${searchTerm}`)
      } 
      else if (stateFilter) 
      {
        response = await axios.get(`http://localhost:8080/api/hotel/getbystate?state=${stateFilter}`)
      } 
      else if (ratingFilter)
      {
        response = await axios.get(`http://localhost:8080/api/hotel/getbyrating?rating=${ratingFilter}`)
      } 
  
      if (response?.data) 
      {
        setHotels(response.data);
        setPage(0);
        setTotalPages(1);
      }
    } 
    catch (error) 
    {
      console.error("Search failed:", error);
      setHotels([]); 
    }
  };
  
  const handleClearSearch = () => 
  {
    setSearchTerm("");
    setStateFilter("");
    setRatingFilter("");
    fetchAllHotels(0); 
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1)
      {
        setPage(page + 1);
      }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link"><Link to="/CustomerDashboard">Home</Link></li>
          <li className="link"><Link to="/service">Services</Link></li>
          <li className="link"><Link to="/contact">Contact</Link></li>
          <li className="link"><Link to="/bookingHistory">bookingHistory</Link></li>
          <li className="link profile-icon">
            <Link to="/profile"><i className="ri-user-line"></i> Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Hotels Section */}
      <section className="hotels__container">
        <h2 className="hotels__header">Explore Hotels</h2>

        {/* Search Filters */}
        <div className="search__container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search__input" />

          <input
            type="text"
            placeholder="Search by state..."
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="search__input"/>

          <input
            type="number"
            placeholder="Search by rating (1-5)"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            min="1"
            max="5"
            className="search__input"/>

          <div className="button__container">
            <button onClick={handleSearch} className="btn btn-primary">Search</button>
            <button onClick={handleClearSearch} className="btn btn-primary">Clear Search</button>
          </div>
        </div>

        <div className="hotels__grid">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
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
                  <Link to={`/rooms/${hotel.id}`}>
                    <button className="btn btn-primary w-100 mt-3">View Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : ( <p>No hotels found for this search.</p> )
          }
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 0} className="btn btn-secondary">Previous</button>
            <span> Page {page + 1} of {totalPages} </span>
            <button onClick={handleNext} disabled={page === totalPages - 1} className="btn btn-secondary">Next</button>
          </div>
        )}
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

export default Hotels;
