import React from "react";
import "./style.css";

function AfterLanding() {
  return (
    <div>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <title>Hotel Booking</title>
      </head>

      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <a href="room details and payment .html">Hotels</a>
          </li>
          <li className="link">
            <a href="service.html">Services</a>
          </li>
          <li className="link">
            <a href="contact.html">Contact</a>
          </li>
          <li className="link profile-icon">
            <a href="#">
              <i className="ri-user-line"></i> Profile
            </a>
          </li>
        </ul>
      </nav>

      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book hotels, stay packages at the lowest price.</p>
          </div>
          <div className="booking__container">
            <form>
              {["Location", "Check In", "Check Out", "Guests"].map((label, i) => (
                <div className="form__group" key={i}>
                  <div className="input__group">
                    <input type="text" />
                    <label>{label}</label>
                  </div>
                  <p>
                    {label === "Location"
                      ? "Where are you going?"
                      : label === "Guests"
                      ? "Add guests"
                      : "Add date"}
                  </p>
                </div>
              ))}
            </form>
            <button className="btn">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>
      </header>

      <section className="section__container popular__container">
        <h2 className="section__header">Popular Hotels</h2>
        <div className="popular__grid">
          {[
            {
              name: "The Plaza Hotel",
              price: "₹2500/-",
              location: "Mumbai, Maharashtra",
              img: "images/hotel-1.jpg",
            },
            {
              name: "Ritz",
              price: "₹3000/-",
              location: "Chennai, Tamil Nadu",
              img: "images/hotel-2.jpg",
            },
            {
              name: "The Peninsula",
              price: "₹2800/-",
              location: "Hyderabad, Telangana",
              img: "images/hotel-3.jpg",
            },
            {
              name: "Atlantis The Palm",
              price: "3500/-",
              location: "Bangalore, Karnataka",
              img: "images/hotel-4.jpg",
            },
            {
              name: "The Ritz-Carlton",
              price: "4000/-",
              location: "Munnar, Kerala",
              img: "images/hotel-5.jpg",
            },
            {
              name: "Marina Bay Sands",
              price: "3200/-",
              location: "Shimla, Himachal Pradesh",
              img: "images/hotel-6.jpg",
            },
          ].map((hotel, index) => (
            <div className="popular__card" key={index}>
              <img src={hotel.img} alt="popular hotel" />
              <div className="popular__content">
                <div className="popular__card__header">
                  <h4>{hotel.name}</h4>
                  <h4>{hotel.price}</h4>
                </div>
                <p>{hotel.location}</p>
                <a href="#" className="book__btn">
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="client">
        <div className="section__container client__container">
          <h2 className="section__header">What Our Clients Say</h2>
          <div className="client__grid">
            {[
              {
                img: "images/client-1.jpg",
                text:
                  "The booking process was seamless, and the confirmation was instant. I highly recommend Cozy Heaven for hassle-free hotel bookings.",
              },
              {
                img: "images/client-2.jpg",
                text:
                  "The website provided detailed information about hotels, including amenities and photos, which helped me make an informed decision.",
              },
              {
                img: "images/client-3.jpg",
                text:
                  "I was able to book a room within minutes, and the hotel exceeded my expectations. I appreciate Cozy Heaven's efficiency and reliability.",
              },
            ].map((client, idx) => (
              <div className="client__card" key={idx}>
                <img src={client.img} alt="client" />
                <p>{client.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section__container">
        <div className="reward__container">
          <p>100+ Discount Codes</p>
          <h4>Join rewards and discover amazing discounts on your booking</h4>
          <a href="#">
            <button className="reward__btn">Join Rewards</button>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>COZY HEAVEN</h3>
            <p>
              Cozy Heaven is a premier hotel booking website that offers a
              seamless and convenient way to find and book accommodations
              worldwide.
            </p>
            <p>
              With a user-friendly interface and a vast selection of hotels,
              Cozy Heaven aims to provide a stress-free experience for travelers
              seeking the perfect stay.
            </p>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Our Team</p>
            <p>Blog</p>
            <p>Book</p>
            <p>Contact Us</p>
          </div>
          <div className="footer__col">
            <h4>Legal</h4>
            <p>FAQs</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="footer__col">
            <h4>Resources</h4>
            <p>Social Media</p>
            <p>Help Center</p>
            <p>Partnerships</p>
          </div>
        </div>
        <div className="footer__bar">
          Copyright © 2024 Cozy Heaven. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default AfterLanding;
