import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const MyHotelsPage = () => {

  const [hotels, setHotels] = useState([])
  const [originalHotels, setOriginalHotels] = useState([])
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState()
  const [rooms, setRooms] = useState([])
  const [showEdit, setShowEdit] = useState(false)

  const [rName, setRName] = useState()
  const [pricePerNight, setPricePerNight] = useState()
  const [maxCapacity, setMaxCapacity] = useState()
  const [aminities, setAminities] = useState([])
  const [rType, setRType] = useState()
  const [roomQuantity, setRoomQuantity] = useState()

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
  const [deletionReason, setDeletionReason] = useState();

  const [hName, setHName] = useState()

  useEffect(() => {

    const getHotels = async () => {

      try {
        let token = localStorage.getItem('token')
        let header = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }

        {/* 1) Get Hotels By Calling GET API (Hotels By Owner)
            2) Set Hotels And Original Hotels (Filer Purpose We Need To Duplicate The Bookings)
                Note:
                  When Using Filter The Hotels State Only Changes After Reset Hotels Are Set From Original Hotels
          */}

        let response = await axios.get('http://localhost:8083/api/hotel/getbyowner', header)
        setHotels(response.data)
        setOriginalHotels(response.data)

      }
      catch (err) {
        console.log(err)
      }
    }

    getHotels()

  }, [])


  const viewDetails = async (hotel) => {

    try {
      setShowDetailsModal(true)
      setSelectedHotel(hotel)

      {/* Get All Rooms By Hotel Id */ }

      let response = await axios.get(`http://localhost:8083/api/room/byhotel/${hotel.id}`)
      setRooms(response.data)
    }
    catch (err) {

      console.log(err)

    }
  }

  const addRooms = async (e) => {


    try {
      e.preventDefault()
      let token = localStorage.getItem('token');
      let header = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      {/* Rooms Add API Called By No.Of Times Of (Room Quantity entered By User In UI) */ }

      for (let i = 0; i < Number(roomQuantity); i++) {
        await axios.post(`http://localhost:8083/api/room/add/${selectedHotel.id}`,
          {
            "name": rName,
            "pricePerNight": pricePerNight,
            "maxCapacity": maxCapacity,
            "aminities": aminities,
            "availabilityStatus": "AVAILABLE",
            "type": rType
          },
          header
        );
      }
      setShowSuccessModal(true)
      setShowRoomModal(true)

    }
    catch (err) {

    }
  }

  const edit = (h) => {

    setShowDetailsModal(false)
    setShowEdit(true)
    setName(h.name)
    setType(h.type)
    setDescription(h.description)
    setCommonAmenities(h.commonAmenities)
    setAddress(h.address)
    setCity(h.city)
    setState(h.state)
    setZip(h.zip)
    setCountry(h.country)
    setLicenseDetails(h.licenseDetails)
    setPropertyProofDetails(h.propertyProofDetails)
    setContactEmail(h.contactEmail)
    setContact(h.contact)
    setImageUrls(h.imageUrls)
  }

  const updateHotel = async (e) => {

    e.preventDefault()
    try {
      let token = localStorage.getItem('token')
      let header = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }

      {/* Updating The Hotel With Changed Values PUT API(Update Hotel With Id) */ }

      let response = await axios.put(`http://localhost:8083/api/hotel/update/${selectedHotel.id}`, {

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
        "isAvailable": "YES",
        "commonAmenities": commonAmenities,
        "licenseDetails": licenseDetails,
        "propertyProofDetails": propertyProofDetails,

      }, header)

      if (imageUrls) {
        const formData = new FormData()
        formData.append("file", imageUrls[0])
        try {
          {/* If Image Selected Uploading Image Also */ }
          await axios.post(`http://localhost:8083/api/hotel/uploadImage/${response.data.id}`, formData
          )

        }

        catch (err) {
          console.log(err)
        }

      }
    }

    catch (err) {

    }
    setShowEdit(false)
    setShowSuccessModal(true)

  }

  const deleteRequest = async (e) => {

    try {
      e.preventDefault()
      let token = localStorage.getItem('token');
      let header = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      {/* Set Hotel Deletion Requested To YES By Calling DELETE API (By Using Selected Hotel) */ }

      await axios.delete(`http://localhost:8083/api/hotel/deleterequest/${selectedHotel.id}`,{
        "deletionReason":deletionReason
      }, header)
      
    }
    catch (err) {

    }
    setShowDeleteModal(false)
    setShowSuccessModal(true)  
  }

  const searchHotel = async () => {

    try {

      let filtered = hotels.filter(h=>h.name == hName)
      setHotels(filtered)

    }
    catch (err) {

    }

  }
  const resetHotel = () => {
    setHotels(originalHotels)
  }

  return (
    <div className="my-hotels-page">
      <Navbar />

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>My Hotels</h1>
          <div className="breadcrumb">
            <Link to="/owner-dashboard">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>My Hotels</span>
          </div>
        </div>

        {/* My Hotels Content */}
        <div className="tab-content active">

          <div className="filter-section">
            <input
              type="text"
              placeholder="Search my hotels..."
              id="my-hotels-search"
              style={{ padding: '0.6rem 0.9rem', flexGrow: 1 }}
              onChange={(e) => { setHName(e.target.value) }}
            />
            <button className="btn btn-secondary btn-sm"
              onClick={() => { searchHotel() }}
            >
              <i className="fas fa-search"></i> Search
            </button>
            <button className="btn btn-secondary btn-sm"
              onClick={() => { resetHotel() }}
            >
              <i className="fas fa-search"></i> Reset
            </button>
          </div>
          <div className="hotels-grid">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card" data-hotel-id={hotel.id}>
                  <div
                    className="hotel-image"
                    style={{
                      backgroundImage: `url(/${(hotel.imageUrls.split("\\").pop())})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >

                    <span className={`hotel-status status-${hotel.status}`}>
                      {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
                    </span>
                  </div>
                  <div className="hotel-details">
                    <div className="hotel-name">{hotel.name}</div>
                    <div className="hotel-location">
                      <i className="fas fa-map-marker-alt"></i> Location :{hotel.city}
                    </div>
                    <div className="hotel-meta">
                      <span className="hotel-type">{hotel.type}</span>
                      <span className="hotel-rooms">Rating :{hotel.starRating}</span>
                    </div>
                    <div className="hotel-actions">
                      <button className="btn btn-outline btn-sm view-hotel-btn"
                        onClick={() => { viewDetails(hotel); setSelectedHotel(hotel) }}>
                        <i className="fas fa-eye"></i> Details
                      </button>
                      <button className="btn btn-secondary btn-sm edit-approved-hotel-btn" onClick={() => { setShowRoomModal(true); setSelectedHotel(hotel) }}>
                        <i className="fas fa-edit"></i> Add Rooms
                      </button>
                      {hotel.deletionRequested == "Yes" ? (
                        <button className="btn btn-warning btn-sm" disabled>
                          <i className="fas fa-hourglass-half"></i> Pending Deletion
                        </button>
                      ) : (
                        <button className="btn btn-danger btn-sm delete-request-btn" onClick={() => { setShowDeleteModal(true); setSelectedHotel(hotel) }}>
                          <i className="fas fa-trash-alt"></i> Delete Req.
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--gray)', gridColumn: '1 / -1' }}>
                No approved hotels found.
              </p>
            )}
          </div>
        </div>
      </div>
      {
        showRoomModal === true ?
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close-button" onClick={() => setShowRoomModal(false)}>×</span>

              <form onSubmit={(e) => { addRooms(e) }}>
                <div className="form-group">
                  <label>Room Types</label>
                  <div className="room-type">
                    <div className="room-type-header">
                      <div className="room-type-title">Add Rooms With Types</div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-required">Room Name</label>
                        <input type="text" required onChange={(e) => setRName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-required">Price/Night ($)</label>
                        <input type="number" required min="0" step="0.01" onChange={(e) => setPricePerNight(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="form-required">Max Capacity</label>
                        <input type="text" required onChange={(e) => setMaxCapacity(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-required">Type</label>
                        <select required onChange={(e) => setRType(e.target.value)}>
                          <option value="">Select</option>
                          <option value="SINGLE">Single</option>
                          <option value="DOUBLE">Double</option>
                          <option value="DELUXE">Deluxe</option>
                          <option value="SUITE">Suite</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-required">Quantity</label>
                        <input type="number" required min="1" value={roomQuantity} onChange={(e) => setRoomQuantity(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-required">Amenities</label>
                      <input type="text" required placeholder="e.g. Pool, WiFi, Restaurant, Spa" onChange={(e) => setAminities(e.target.value)} />
                      <small className="form-hint">Separate amenities with commas</small>
                    </div>

                    <button type="submit" className="btn btn-primary" id="submit-hotel-btn">
                      <i className="fas fa-paper-plane"></i> Add Rooms
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          : ""
      }


      {/* View Hotel Details Modal */}
      {
        showDetailsModal && (

          <div id="view-details-modal" className="modal">
            <div className="modal-content" style={{ maxWidth: '800px' }}>
              <div className="modal-header">
                <h2>Hotel Details</h2>
                <button className="close-modal" onClick={() => setShowDetailsModal(false)}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="hotel-detail-section">
                  <h4>Basic Information</h4>
                  <div className="detail-item">
                    <strong>Type:</strong> <span>{selectedHotel.type}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Address:</strong> <span>{selectedHotel.address}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Contact Email:</strong> <span>{selectedHotel.contactEmail}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Contact Phone:</strong> <span>{selectedHotel.contact}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Date Added:</strong> <span>{selectedHotel.createdAt}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Description:</strong> <span>{selectedHotel.description}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Common Amenities:</strong>
                    <span className="amenities-list">
                      {selectedHotel.commonAmenities.split(',').map((amenity, index) => (
                        <span key={index}>{amenity.trim()}</span>

                      ))}
                    </span>
                  </div>
                </div>
                <div className="hotel-detail-section">
                  <h4>Available Rooms : ({rooms.length})</h4>
                  <div className="room-details-container">
                    {
                      rooms.map((r, index) => (

                        <div className="room-detail-card" key={index}>
                          <h5>Room No : {r.id} / {r.name}</h5>
                          <div className="detail-item">
                            <strong>Price:</strong> <span>{r.pricePerNight}</span>
                          </div>
                          <div className="detail-item">
                            <strong>MaxCapacity:</strong>&nbsp;&nbsp;&nbsp;<span>{r.maxCapacity}</span>
                          </div>
                          <div className="detail-item">
                            <strong>Availability</strong> <span>{r.availabilityStatus}</span>
                          </div>
                          <div className="detail-item">
                            <strong>Amenities:</strong>
                            <span className="amenities-list">
                              {r.aminities.split(',').map((amenity, index) => (
                                <span key={index}>{amenity}</span>
                              ))}
                            </span>
                          </div>
                        </div>

                      ))
                    }



                  </div>
                </div>
                <div className="availability-section">
                  <strong>Booking Status:</strong>
                  <button className="btn btn-sm availability-toggle available" data-hotel-id="hotel-1">
                    <i className="fas fa-check-circle"></i> {selectedHotel.isAvailable}
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline close-modal-btn" data-target="view-details-modal" onClick={() => { setShowDetailsModal(false) }}>
                  Close
                </button>
                <button className="btn btn-secondary" onClick={() => { edit(selectedHotel) }}>
                  <i className="fas fa-edit"></i> Edit Hotel
                </button>
              </div>
            </div>
          </div>

        )

      }
      {
        showEdit == true ?

          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Hotel Details</h2>
              <form id="hotel-form" onSubmit={(e) => { updateHotel(e) }}>


                <div className="form-group">
                  <label htmlFor="hotel-name-input" className="form">Hotel Name</label>
                  <input type="text" id="hotel-name-input" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="hotel-type" className="form">Hotel Type</label>
                    <select id="hotel-type" value={type} onChange={(e) => { setType(e.target.value) }} >
                      <option value="">Select hotel type</option>
                      <option value="BUDGET">Budget</option>
                      <option value="HOSTEL">Hostel</option>
                      <option value="LUXURY">Luxury</option>
                      <option value="VILLA">Villa</option>
                    </select>
                  </div>

                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form">Description</label>
                  <textarea id="description" rows="4" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="amenities" className="form">Common Amenities</label>
                  <input type="text" id="amenities" value={commonAmenities} onChange={(e) => { setCommonAmenities(e.target.value) }} />
                  <small className="form-hint">Separate amenities with commas</small>
                </div>



                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address" className="form">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className="form">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => { setCity(e.target.value) }} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="state" className="form">State/Region</label>
                    <input type="text" id="state" value={state} onChange={(e) => { setState(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip" className="form">ZIP/Postal Code</label>
                    <input type="text" id="zip" value={zip} onChange={(e) => { setZip(e.target.value) }} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="form">Country</label>
                  <input type="text" id="country" value={country} onChange={(e) => { setCountry(e.target.value) }} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="licence-detail" className="form">Licence No</label>
                    <input type="text" id="licence-detail" value={licenseDetails} onChange={(e) => { setLicenseDetails(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form">Propery Proof</label>
                    <input type="text" id="tax" value={propertyProofDetails} onChange={(e) => { setPropertyProofDetails(e.target.value) }} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form">Contact Email</label>
                    <input type="email" id="contact-email" value={contactEmail} onChange={(e) => { setContactEmail(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form">Contact Phone</label>
                    <input type="tel" id="contact-phone" value={contact} onChange={(e) => { setContact(e.target.value) }} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="images">Hotel Images</label>
                  <input type="file" id="images" onChange={(e) => { setImageUrls(e.target.files) }} />
                  <small className="form-hint">Upload Exact Images Of Hotel</small>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" id="cancel-form" onClick={() => { setShowEdit(false) }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" id="submit-hotel-btn">
                    <i className="fas fa-paper-plane"></i> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          : ""}


      {/* Delete Request Modal */}
      {showDeleteModal && (
        <div id="delete-modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Request Hotel Deletion</h2>
              <button className="close-modal" data-target="delete-modal" onClick={() => setShowDeleteModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={(e) => { deleteRequest(e) }}>
              <div className="modal-body">
                <p>
                  Request deletion of <strong>{selectedHotel.name}</strong>. Provide reason:
                </p>
                <div className="form-group delete-reason-group">
                  <label htmlFor="delete-reason" className="form-required">
                    Reason
                  </label>
                  <select id="delete-reason" required onChange={(e) => { setDeletionReason(e.target.value) }}>
                    <option value="">Select a reason</option>
                    <option value="permanent-closure">Permanent Closure</option>
                    <option value="sold-business">Sold the Business</option>
                    <option value="rebranding">Rebranding</option>
                    <option value="duplicate-listing">Duplicate Listing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline close-modal-btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-danger">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Success Modal */}

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
              <p>Action completed.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary close-modal-btn" data-target="success-modal" onClick={() => { setShowSuccessModal(false) }}>
                OK
              </button>
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default MyHotelsPage;