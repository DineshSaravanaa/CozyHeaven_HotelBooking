import React from "react";
import "./service.css";
import "remixicon/fonts/remixicon.css"; // Remix icon import

function Service() {
  return (
    <div>
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <a href="/afterlanding">Home</a>
          </li>
          <li className="link">
            <a href="/listofhotels">Hotels</a>
          </li>
          <li className="link">
            <a href="/contact">Contact</a>
          </li>
          <li className="link profile-icon">
            <a href="#">
              <i className="ri-user-line"></i> Profile
            </a>
          </li>
        </ul>
      </nav>

      <section className="services__container">
        <h2 className="services__header">Our Services</h2>
        <div className="services__grid">
          <div className="service__card">
            <i className="ri-hotel-line"></i>
            <h4>Luxury Hotel Stays</h4>
            <p>Enjoy top-class hotel stays with premium amenities and breathtaking views.</p>
          </div>
          <div className="service__card">
            <i className="ri-restaurant-line"></i>
            <h4>Fine Dining</h4>
            <p>Indulge in world-class cuisines with our hotel restaurant partners.</p>
          </div>
          <div className="service__card">
            <i className="ri-car-line"></i>
            <h4>Airport Transfers</h4>
            <p>We provide hassle-free airport pickup and drop-off services.</p>
          </div>
          <div className="service__card">
            <i className="ri-swimming-pool-line"></i>
            <h4>Swimming Pool</h4>
            <p>Relax in luxury pools with spa and wellness options.</p>
          </div>
          <div className="service__card">
            <i className="ri-wifi-line"></i>
            <h4>Free Wi-Fi</h4>
            <p>Stay connected with our high-speed complimentary Wi-Fi services.</p>
          </div>
          <div className="service__card">
            <i className="ri-customer-service-line"></i>
            <h4>24/7 Customer Support</h4>
            <p>We are available round the clock for any assistance you may need.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>COZY HEAVEN</h3>
            <p>Your trusted hotel booking platform for a luxurious and comfortable stay.</p>
          </div>
          <div className="footer__col">
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>
          <div className="footer__col">
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2024 Cozy Heaven. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Service;
