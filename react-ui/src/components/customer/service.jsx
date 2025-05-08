import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./service.css";

function Services() 
{
  const [services, setServices] = useState([]);

  useEffect(() => 
  {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/services/getall");
      setServices(response.data);
    } 
    catch (error) 
    {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <Link to="/CustomerDashboard">Home</Link>
          </li>
          <li className="link">
            <Link to="/hotel">Hotels</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="link">
            <Link to="/bookingHistory">bookingHistory</Link>
          </li>
          <li className="link profile-icon">
            <Link to="/profile">
              <i className="ri-user-line"></i> Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Services Section */}
      <section className="services__container">
        <h2 className="services__header">Our Services</h2>
        <div className="services__grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="service__card">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))
          ) : (
            <p>Loading services...</p>
          )}
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

export default Services;