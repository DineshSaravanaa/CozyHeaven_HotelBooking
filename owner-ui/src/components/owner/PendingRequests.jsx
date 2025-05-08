import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";

const PendingRequests = () => {

    const [Pending, setPending] = useState([])
    const [deletions, setDeletions] = useState([])

    useEffect(() => {
        const getPendingRequests = async () => {
            try {
                let token = localStorage.getItem('token')
                let header = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                {/* Getting Pending Requests GET API (Using Owner Via Principal) */ }

                let response = await axios.get("http://localhost:8083/api/hotel/pendingrequest", header)
                const pendingHotels = response.data

                {/* Getting Deletion Requests GET API (Using Owner Via Principal) */ }

                let resp = await axios.get("http://localhost:8083/api/hotel/deletionrequested", header)
                const deletionsHotels = resp.data

                {/* Filtering Pending Requests Without Repetation Of Requests */ }

                const filterPending = pendingHotels.filter(p => !deletionsHotels.some(d => d.id == p.id))
                setPending(filterPending)
                setDeletions(deletionsHotels)


            }
            catch (err) {

            }

        }
        getPendingRequests()

    }, [])
    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="page-header">
                    <h1 id="page-title">Pending Hotel Requests</h1>
                    <div className="breadcrumb">
                        <Link to="/owner-dashboard">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span id="current-page">Pending Requests</span>
                    </div>
                </div>

                <div id="requests-content" className="tab-content active">
                    <h6>Note : If Your Hotel In Verification Progress You Can Able To Add Rooms And Make Available For Bookings.</h6>
                    <h6>Once Verification Completes We Make The Hotel As Verified!</h6>

                    <div className="hotels-grid" id="requests-grid">
                        {/* Static Cards */}


                        {
                            Pending &&
                            Pending.map((p, index) => (
                                <div className="hotel-card" data-hotel-id="hotel-3-pending" key={index}>
                                    <div
                                        className="hotel-image"
                                        style={{
                                            backgroundImage: `url(/${p.imageUrls.split("\\").pop()})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <span className="hotel-status status-pending">Pending</span>
                                    </div>
                                    <div className="hotel-details">
                                        <div className="hotel-name">{p.name}</div>
                                        <div className="hotel-location">
                                            <i className="fas fa-map-marker-alt"></i> {p.address} , {p.city}
                                        </div>
                                        <div className="hotel-meta">
                                            <span className="hotel-type">{p.type}</span>
                                            <span className="hotel-rooms"></span>
                                        </div>
                                        <div className="hotel-actions">
                                            <button className="btn btn-secondary btn-sm edit-pending-hotel-btn">
                                                <i className="fas fa-edit"></i> Verification In Progress
                                            </button>

                                        </div>
                                    </div>
                                </div>


                            ))
                        }
                        {
                            deletions &&
                            deletions.map((p, index) => (
                                <div className="hotel-card" data-hotel-id="hotel-3-pending" key={index}>
                                    <div
                                        className="hotel-image"
                                        style={{
                                            backgroundImage: `url(/${p.imageUrls.split("\\").pop()})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <span className="hotel-status status-pending">Pending</span>
                                    </div>
                                    <div className="hotel-details">
                                        <div className="hotel-name">{p.name}</div>
                                        <div className="hotel-location">
                                            <i className="fas fa-map-marker-alt"></i> {p.address} , {p.city}
                                        </div>
                                        <div className="hotel-meta">
                                            <span className="hotel-type">{p.type}</span>
                                            <span className="hotel-rooms">{p.deletionReason}</span>
                                        </div>
                                        <div className="hotel-actions">
                                            <button className="btn btn-secondary btn-sm edit-pending-hotel-btn">
                                                <i className="fas fa-edit"></i> Deletion In Progress
                                            </button>

                                        </div>
                                    </div>
                                </div>


                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingRequests;
