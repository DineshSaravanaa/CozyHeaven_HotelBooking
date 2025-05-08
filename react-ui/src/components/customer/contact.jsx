import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import "./contact.css";
function ContactUs() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!name || !email || !message) 
    {
      alert("Please fill all the fields")
      return;
    }

    const body =
    {
          name,
          email,
          message,
    }

    try 
    {
      const response = await axios.post("http://localhost:8080/api/contact/add",body,
        {
          headers: 
          {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) 
      {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } 
    catch (error) 
    {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again.");
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
            <Link to="/service">Services</Link>
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

      {/* Contact Form Section */}
      <section className="contact__container">
        <h2 className="contact__header">Get in Touch</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Have questions about our services? We're here to help and would love to hear from you.
        </p>

        <div className="contact__form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label"> Your Email </label>
              <input type="email" className="form-control" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="form-label"> Your Message </label>
              <textarea className="form-control" id="message" rows="5" value={message} 
              onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
            onClick={(e) => {handleSubmit(e)}} >SUBMIT
            </button>
          </form>
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

export default ContactUs;
