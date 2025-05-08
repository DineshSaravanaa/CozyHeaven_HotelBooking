import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Signup = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [contact, setContact] = useState()
  const [address, setAddress] = useState()
  const [governmentIDType, setGovernmentIDType] = useState()
  const [governmentIDNumber, setGovernmentIDNumber] = useState()
  const [businessRegNo, setBusinessRegNo] = useState()
  const [GSTIN, setGSTIN] = useState()
  const [bankDetails, setBankDetails] = useState()

  const navigate = useNavigate()

  const SignUp = (e) => {
    e.preventDefault();
    try {

      {/* After Collecting The Owner Details In States Calling The POST API For Adding The Owner */ }

      axios.post('http://localhost:8083/api/hotelowner/add',
        {
          "name": name,
          "email": email,
          "contact": contact,
          "address": address,
          "governmenttIDType": governmentIDType,
          "governmentIDNumber": governmentIDNumber,
          "buisnessRegistrationNumber": businessRegNo,
          "gstin": GSTIN,
          "bankDetails": bankDetails,
          "isVerified": "Pending",
          "createdAt": new Date().toISOString().slice(0, 19),
          "user": {
            "username": email,
            "password": password,
          }
        }
      ).then(response => {
        console.log("SignUp Successfull!")
      })
      alert("User Registered Successfully!")
      navigate('/login')

    }
    catch (err) {
      console.log(err)
    }

  }


  return (
    <>
      <nav>
        <div className="logo">Cozy Heaven</div>
        <ul>
          <li><Link to="/login" className="link">Login</Link>  </li>
        </ul>
      </nav>

      <section className="signup-container">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Hotel Owner Registration</h2>
              <p>Provide your details for verification. Fields marked * are required.</p>
            </div>

            <form id="signup-form" onSubmit={(e) => { SignUp(e) }}>
              <h3>Owner & Hotel Details</h3>

              <div className="form-group">
                <label htmlFor="name" className="form-required">Full Name</label>
                <input type="text" id="name" required placeholder="Enter your full name" onChange={(e) => { setName(e.target.value) }} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-required">Email</label>
                  <input type="email" id="email" required placeholder="you@example.com" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-required">Password</label>
                  <input type="password" id="password" required placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact" className="form-required">Contact Number</label>
                  <input type="tel" id="contact" required placeholder="+1 123-456-7890" onChange={(e) => { setContact(e.target.value) }} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-required">Address</label>
                <textarea id="address" required placeholder="Enter your address" onChange={(e) => { setAddress(e.target.value) }} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="governmentIDType" className="form-required">Government ID Type</label>
                  <select id="governmentIDType" required onChange={(e) => { setGovernmentIDType(e.target.value) }}>
                    <option value="">Select ID Type</option>
                    <option value="AadharCard">AadharCard</option>
                    <option value="Passport">Passport</option>
                    <option value="DrivingLicence">Driving License</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="governmentIDNumber" className="form-required">Government ID Number</label>
                  <input type="text" id="governmentIDNumber" required placeholder="Enter ID number" onChange={(e) => { setGovernmentIDNumber(e.target.value) }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="businessRegNo" className="form-required">Business Registration Number</label>
                  <input type="text" id="businessRegNo" required placeholder="Enter registration number" onChange={(e) => { setBusinessRegNo(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="gstin" className="form-required">GSTIN</label>
                  <input type="text" id="gstin" required placeholder="Enter GSTIN" onChange={(e) => { setGSTIN(e.target.value) }} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bankDetails" className="form-required">Bank Details</label>
                <textarea id="bankDetails" required placeholder="Enter bank details (account no, IFSC, etc.)" onChange={(e) => { setBankDetails(e.target.value) }} />
              </div>

              <div className="form-actions form-actions-center">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-user-plus"></i> Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Cozy Heaven Stay. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Signup;
