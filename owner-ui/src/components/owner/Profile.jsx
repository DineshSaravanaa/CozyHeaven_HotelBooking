import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import Navbar from './Navbar';


const ProfilePage = () => {

    const userData = useSelector(state => state.users.users)
    const [name, setName] = useState()
    const [contact, setContact] = useState()

    const [isEditMode, setIsEditMode] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);



    useEffect(() => {
        const getNameContact = () => {
            if (userData) {
                setName(userData.name)
                setContact(userData.contact)
            }

        }
        getNameContact()
    }, [userData])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let token = localStorage.getItem('token')
        let header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        let body = {
            "name": name, "contact": contact
        }
        try {

            {/* Update Profile By PUT API */}
            await axios.put('http://localhost:8083/api/hotelowner/update', body, header)
            setIsEditMode(false);
            setShowSuccessModal(true);
        }
        catch (err) {
            console.log(err)
        }

    };

    return (

        <div className="profile-container">
           <Navbar/>


            <div className="container mt-4">
                {/* Page Header */}
                <div className="page-header d-flex justify-content-between align-items-center mb-4">
                    <h1>My Profile</h1>
                    <div className="breadcrumb">
                    <Link to="/owner-dashboard">Home</Link>
                        <span className="breadcrumb-separator mx-2">/</span>
                        <span>My Profile</span>
                    </div>
                </div>

                {/* My Profile Content */}
                <div id="profile-content" className="tab-content active">
                    <div className="form-container card shadow-sm">
                        <div className="card-body">
                            <div className="form-header text-center mb-4">
                                <h2>My Profile</h2>
                                <p className="text-muted">View and update your contact information.</p>
                            </div>

                            {/* Display Mode */}
                            {!isEditMode && (
                                <div id="profile-display-mode">
                                    <div className="profile-display-group py-2 border-bottom">
                                        <strong className="d-inline-block" style={{ width: '120px' }}>Full Name:</strong>
                                        <span id="display-owner-name">{userData.name}</span>
                                    </div>
                                    <div className="profile-display-group py-2 border-bottom">
                                        <strong className="d-inline-block" style={{ width: '120px' }}>Email:</strong>
                                        <span id="display-owner-email">{userData.email}</span>
                                    </div>
                                    <div className="profile-display-group py-2 border-bottom">
                                        <strong className="d-inline-block" style={{ width: '120px' }}>Phone:</strong>
                                        <span id="display-owner-phone">{userData.contact}</span>
                                    </div>
                                    <div className="profile-display-group py-2 border-bottom">
                                        <strong className="d-inline-block" style={{ width: '120px' }}>Buisness Reg No:</strong>
                                        <span id="display-owner-phone">{userData.buisnessRegistrationNumber}</span>
                                    </div>
                                    <div className="profile-display-group py-2 border-bottom">
                                        <strong className="d-inline-block" style={{ width: '120px' }}>Bank Details:</strong>
                                        <span id="display-owner-phone">{userData.bankDetails}</span>
                                    </div>
                                    <div className="form-actions mt-4 pt-3 border-top">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            id="edit-profile-btn"
                                            onClick={() => setIsEditMode(true)}
                                        >
                                            <i className="fas fa-edit me-2"></i> Edit Profile
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Edit Mode */}
                            {isEditMode && (
                                <div id="profile-edit-mode">
                                    <form id="profile-edit-form" onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="edit-owner-name" className="form-required">Full Name</label>
                                            <input
                                                type="text"
                                                id="edit-owner-name"
                                                className="form-control"
                                                required
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="edit-owner-phone" className="form-required">Phone</label>
                                            <input
                                                type="tel"
                                                id="edit-owner-phone"
                                                className="form-control"
                                                required
                                                value={contact}
                                                onChange={(e) => { setContact(e.target.value) }}
                                            />
                                        </div>
                                        <div className="form-actions mt-4 pt-3 border-top">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary me-2"
                                                id="cancel-profile-edit-btn"
                                                onClick={() => setIsEditMode(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary" id="save-profile-btn">
                                                <i className="fas fa-save me-2"></i> Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Profile updated successfully!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;