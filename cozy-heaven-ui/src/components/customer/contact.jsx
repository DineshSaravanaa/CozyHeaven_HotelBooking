import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);

    // Show success message
    alert("Your message has been sent successfully!");
  };

  return (
    <div className="bg-light">
      {/* Navigation */}
      <nav>
        <div className="nav__logo">COZY HEAVEN</div>
        <ul className="nav__links">
          <li className="link">
            <a href="afterlanding.html">Home</a>
          </li>
          <li className="link">
            <a href="room details and payment .html">Hotels</a>
          </li>
          <li className="link">
            <a href="service.html">Services</a>
          </li>
          <li className="link profile-icon">
            <a href="#">
              <i className="ri-user-line"></i> Profile
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="container py-5 mt-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Have questions about our services? We're here to help and would love
            to hear from you.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="row g-4">
          {/* Contact Information */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm contact-card">
              <div className="card-body p-4">
                <h2 className="card-title h3 mb-4">Contact Details</h2>
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-geo-alt contact-icon"></i>
                  <span className="ms-3 text-muted">123 Cozy Street, Mumbai, India</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-envelope contact-icon"></i>
                  <span className="ms-3 text-muted">support@cozyheaven.com</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-telephone contact-icon"></i>
                  <span className="ms-3 text-muted">+91 98765 43210</span>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-clock contact-icon"></i>
                  <span className="ms-3 text-muted">Mon - Fri: 9 AM - 6 PM</span>
                </div>
                <div className="mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
                    className="img-fluid rounded-3"
                    alt="Location Map"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title h3 mb-4">Send a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gradient w-100 py-3 d-flex align-items-center justify-content-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0 text-muted">
            Copyright © <script>document.write(new Date().getFullYear())</script> Cozy Heaven. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
