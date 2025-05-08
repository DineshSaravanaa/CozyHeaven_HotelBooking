import React from "react";
import "./style.css";

function HomePage() {
  return (
    <div>
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link"><a href="room details and payment .html">Hotels</a></li>
          <li className="link"><a href="service.html">Services</a></li>
          <li className="link"><a href="login.html">Contact</a></li>
          <li className="link"><a href="login.html" className="login-btn">Login</a></li>
        </ul>
      </nav>

      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book Hotels, stay packages at lowest price.</p>
          </div>
          <div className="booking__container">
            <form>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Location</label>
                </div>
                <p>Where are you going?</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Check In</label>
                </div>
                <p>Add date</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Check Out</label>
                </div>
                <p>Add date</p>
              </div>
              <div className="form__group">
                <div className="input__group">
                  <input type="text" />
                  <label>Guests</label>
                </div>
                <p>Add guests</p>
              </div>
            </form>
            <button className="btn"><i className="ri-search-line"></i></button>
          </div>
        </div>
      </header>

      <section className="section__container popular__container">
        <h2 className="section__header">Popular Hotels</h2>
        <div className="popular__grid">
          {[
            {
              img: "images/hotel-1.jpg",
              name: "The Plaza Hotel",
              price: "2500/-",
              location: "Mumbai, Maharastra",
              link: "hotel-details-1.html"
            },
            {
              img: "images/hotel-2.jpg",
              name: "Ritz",
              price: "3000/-",
              location: "Chennai, Tamil nadu",
              link: "hotel-details-2.html"
            },
            {
              img: "images/hotel-3.jpg",
              name: "The Peninsula",
              price: "2800/-",
              location: "Hyderabad, Telangana",
              link: "hotel-details-3.html"
            },
            {
              img: "images/hotel-4.jpg",
              name: "Atlantis The Palm",
              price: "3500/-",
              location: "Bangalore, Karnataka",
              link: "hotel-details-4.html"
            },
            {
              img: "images/hotel-5.jpg",
              name: "The Ritz-Carlton",
              price: "4000/-",
              location: "Munnar, Kerala",
              link: "hotel-details-5.html"
            },
            {
              img: "images/hotel-6.jpg",
              name: "Marina Bay Sands",
              price: "3200/-",
              location: "Shimla, Himachal pradesh",
              link: "hotel-details-6.html"
            }
          ].map((hotel, index) => (
            <div key={index} className="popular__card">
              <img src={hotel.img} alt="popular hotel" />
              <div className="popular__content">
                <div className="popular__card__header">
                  <h4>{hotel.name}</h4>
                  <h4>{hotel.price}</h4>
                </div>
                <p>{hotel.location}</p>
                <a href={hotel.link} className="book__btn">Book Now</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="client">
        <div className="section__container client__container">
          <h2 className="section__header">What our client say</h2>
          <div className="client__grid">
            {[
              {
                img: "images/client-1.jpg",
                text: "The booking process was seamless, and the confirmation was instant. I highly recommend WDM&Co for hassle-free hotel bookings."
              },
              {
                img: "images/client-2.jpg",
                text: "The website provided detailed information about hotel, including amenities, photos, which helped me make an informed decision."
              },
              {
                img: "images/client-3.jpg",
                text: "I was able to book a room within minutes, and the hotel exceeded my expectations. I appreciate WDM&Co's efficiency and reliability."
              }
            ].map((client, index) => (
              <div key={index} className="client__card">
                <img src={client.img} alt="client" />
                <p>{client.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section__container">
        <div className="reward__container">
          <p>100+ discount codes</p>
          <h4>Join rewards and discover amazing discounts on your booking</h4>
          <a href="login.html">
            <button className="reward__btn">Join Rewards</button>
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="section__container footer__container">
          <div className="footer__col">
            <h3>COZY HEAVEN</h3>
            <p>Cozy heaven is a premier hotel booking website that offers a seamless and convenient way to find and book accommodations worldwide.</p>
            <p>With a user-friendly interface and a vast selection of hotels, cozy heaven aims to provide a stress-free experience for travelers seeking the perfect stay.</p>
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
          Copyright © 2023 Web Design Mastery. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
