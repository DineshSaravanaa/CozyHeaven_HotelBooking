import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const AddEditHotel = () => {

  const [name, setName] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [contactEmail, setContactEmail] = useState();
  const [contact, setContact] = useState();
  const [imageUrls, setImageUrls] = useState();
  const [commonAmenities, setCommonAmenities] = useState();
  const [licenseDetails, setLicenseDetails] = useState();
  const [propertyProofDetails, setPropertyProofDetails] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const addHotel = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem('token');
      let header = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      {/* Add Hotels By POST API */}
      const hotelResponse = await axios.post( 'http://localhost:8083/api/hotel/add',
        {
          "name": name,
          "type": type,
          "description": description,
          "address": address,
          "city": city,
          "state": state,
          "zip": zip,
          "country": country,
          "contactEmail": contactEmail,
          "contact": contact,
          "imageUrls": "",
          "status": "APPROVED",
          "isAvailable": "YES",
          "commonAmenities": commonAmenities,
          "licenseDetails": licenseDetails,
          "propertyProofDetails": propertyProofDetails,
          "starRating": 4.5,
          "createdAt": new Date().toISOString().slice(0, 19),
          "approvedAt": new Date().toISOString().slice(0, 19),
          "deletionRequested": "No"
        },
        header
      );

      if (!imageUrls) {
        alert("Image Not Selected")
      }
      const formData = new FormData()
      formData.append('file', imageUrls[0])

      try {
         
        {/*  Uploading Image  */ }

        await axios.post(`http://localhost:8083/api/hotel/uploadImage/${hotelResponse.data.id}`, formData,header
        )

      }

      catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.error(err);
    }
    setShowSuccessModal(true)
  };


  return (
    <div>
      <Navbar/>


      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 id="page-title">Add Hotel</h1>
          <div className="breadcrumb">
          <Link to="/owner-dashboard">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span id="current-page">Add/Edit Hotel</span>
          </div>
        </div>

        {/* Add/Edit Hotel Content */}
        <div className="tab-content active">
          <div className="form-container">
            <div className="form-header">
              <h2 id="add-edit-hotel-title">Add New Hotel</h2>
              <p>Fill out the form below. All fields marked with * are required.</p>
            </div>
            <form id="hotel-form" onSubmit={(e) => { addHotel(e) }}>
              <input type="hidden" id="editing-hotel-id" value="" />

              <div className="form-group">
                <label htmlFor="hotel-name-input" className="form-required">Hotel Name</label>
                <input type="text" id="hotel-name-input" required placeholder="Enter your hotel name" onChange={(e) => { setName(e.target.value) }} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="hotel-type" className="form-required">Hotel Type</label>
                  <select id="hotel-type" required onChange={(e) => { setType(e.target.value) }} >
                    <option value="">Select hotel type</option>
                    <option value="BUDGET">Budget</option>
                    <option value="HOSTEL">Hostel</option>
                    <option value="LUXURY">Luxury</option>
                    <option value="VILLA">Villa</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="total-rooms" className="form-required">Total Rooms (Calculated)</label>
                  <input type="number" id="total-rooms" required placeholder="Add Rooms Via My Hotels Tab" min="1" readOnly style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }} title="Total rooms calculated from room types below" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-required">Description</label>
                <textarea id="description" rows="4" required placeholder="Describe your hotel..." onChange={(e) => { setDescription(e.target.value) }}></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="amenities" className="form-required">Common Amenities</label>
                <input type="text" id="amenities" required placeholder="e.g. Pool, WiFi, Restaurant, Spa" onChange={(e) => { setCommonAmenities(e.target.value) }} />
                <small className="form-hint">Separate amenities with commas</small>
              </div>



              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address" className="form-required">Address</label>
                  <input type="text" id="address" required placeholder="Street address" onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="city" className="form-required">City</label>
                  <input type="text" id="city" required placeholder="City" onChange={(e) => { setCity(e.target.value) }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state" className="form-required">State/Region</label>
                  <input type="text" id="state" required placeholder="State or region" onChange={(e) => { setState(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="zip" className="form-required">ZIP/Postal Code</label>
                  <input type="text" id="zip" required placeholder="Postal code" onChange={(e) => { setZip(e.target.value) }} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-required">Country</label>
                <input type="text" id="country" required placeholder="Country" onChange={(e) => { setCountry(e.target.value) }} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="licence-detail" className="form-required">Licence No</label>
                  <input type="text" id="licence-detail" required placeholder="Licence Number" onChange={(e) => { setLicenseDetails(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-required">Propery Proof</label>
                  <input type="text" id="tax" required placeholder="Tax Reciept Number" onChange={(e) => { setPropertyProofDetails(e.target.value) }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-required">Contact Email</label>
                  <input type="email" id="contact-email" required placeholder="Contact email" onChange={(e) => { setContactEmail(e.target.value) }} />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-required">Contact Phone</label>
                  <input type="tel" id="contact-phone" required placeholder="Contact phone" onChange={(e) => { setContact(e.target.value) }} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="images">Hotel Images</label>
                <input type="file" id="images" onChange={(e) => { setImageUrls(e.target.files) }} />
                <small className="form-hint">Upload Exact Images Of Hotel</small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" id="cancel-form">Cancel</button>
                <button type="submit" className="btn btn-primary" id="submit-hotel-btn">
                  <i className="fas fa-paper-plane"></i> Add Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div id="success-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Success!</h2>
              <button className="close-modal" data-target="success-modal" onClick={() => { setShowSuccessModal(false) }}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Hotel Added Successfully!</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary close-modal-btn" data-target="success-modal" onClick={()=>{setShowSuccessModal(false)}}>
                OK
              </button>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default AddEditHotel;
