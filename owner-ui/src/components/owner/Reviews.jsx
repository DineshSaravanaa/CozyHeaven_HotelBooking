import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Navbar from "./Navbar";

const ReviewsDashboard = () => {

    const userData = useSelector(state => state.users.users)

    const [reviews, setReviews] = useState([])
    const [originalReviews, setOriginalReviews] = useState([])

    const [hotels, setHotels] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [responseText, setResponseText] = useState("");
    const [selectedHId, setSelectedHId] = useState()
    const [rating, setRating] = useState()


    useEffect(() => {


        const getReviews = async () => {

            try {
                let token = localStorage.getItem('token')
                let header = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                {/* 1) Get Reviews By GET API (Reviews By Owner)
                    2) Set Reviews And Original Reviews (Filer Purpose We Need To Duplicate The Reviews)
                       Note:
                        When Using Filter The Reviews State Only Changes After Reset Reviews Are Set From Original Reviews */}

                let resp = await axios.get('http://localhost:8083/api/hotel/reviewbyowner', header)
                setReviews(resp.data)
                setOriginalReviews(resp.data)

                {/* 1) Get All Hotels And Store In Hotels For Fetching Names Of All Hotels */ }

                let response1 = await axios.get('http://localhost:8083/api/hotel/getbyowner', header)
                setHotels(response1.data)
            }
            catch (err) {
                console.log(err)
                console.log(userData?.id)
            }

        }
        getReviews()


    }, [userData]) // when User Data Changes UseEffect Called Once Again

    const response = (e) => {
        e.preventDefault()

        try {
            let token = localStorage.getItem('token')
            let header = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            {/* Responding To Reviews By Calling PUT API (Response As Owner) */ }

            axios.put(`http://localhost:8083/api/hotel/review/response/${selectedReview.id}`, {
                "responseText": responseText,
                "responseDate": new Date().toISOString().split('T')[0]
            }, header)

            setShowModal(false)

        }

        catch (err) {

        }

    }

    const filterReviews = async () => {
        if (selectedHId) {

            try {
                let token = localStorage.getItem('token')
                let header = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                {/* Filter Reviews  By Hotel - GET API (reviews By Owner)
                    If Rating Selected Filter By Rating Also  */}

                let response = await axios.get(`http://localhost:8083/api/hotel/reviewbyhotel/${selectedHId}`, header)
                if (rating) {
                    const filtered = response.data.filter(r =>
                        r.rating == rating
                    )
                    setReviews(filtered);

                }
                else {
                    setReviews(response.data)
                }
            }

            catch (err) {

            }

        }
        else {
            alert("Please Select Hotel Name")
        }

    }

    const resetFilter = () => {
        setReviews(originalReviews)
        setRating(null)
    }
    return (
        <div>
            <Navbar />

            <div className="container">
                {/* Page Header */}
                <div className="page-header">
                    <h1 id="page-title">Customer Reviews</h1>
                    <div className="breadcrumb">
                        <Link to="/owner-dashboard">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span id="current-page">Reviews</span>
                    </div>
                </div>

                {/* Reviews Content */}
                <div id="reviews-content" className="tab-content active">

                    <div className="filter-section">
                        <label htmlFor="review-hotel-filter">Hotel:</label>
                        <select id="review-hotel-filter" onChange={(e) => { setSelectedHId(e.target.value) }}>
                            <option value="">All Hotels</option>
                            {
                                hotels.map((h, index) => (

                                    <option key={index} value={h.id}>{h.name}</option>
                                ))

                            }


                        </select>
                        <label htmlFor="review-rating-filter">Rating:</label>
                        <select id="review-rating-filter" onChange={(e) => { setRating(e.target.value) }}>
                            <option value="">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <button className="btn btn-primary btn-sm" onClick={() => { filterReviews() }}>
                            <i className="fas fa-filter"></i> Filter
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => { resetFilter() }}>
                            <i className="fas fa-filter"></i> Reset
                        </button>
                    </div>

                    <div className="reviews-grid" id="reviews-grid-container">

                        {
                            reviews &&
                            reviews.sort((a,b)=>b.id-a.id).map((r, index) => (
                                <div className="review-card" key={index}>
                                    <div className="review-header">
                                        <div className="review-guest">
                                            <strong>{r.booking?.customer?.name}</strong>
                                            <span>Stayed: {r.booking?.checkIn} to {r.booking?.checkOut}</span>
                                        </div>
                                        <div className="review-rating" title="4.5 Stars">
                                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i>
                                            <span>{r.rating}.0</span>

                                        </div>
                                    </div>
                                    <div className="review-body">
                                        {r.comment}
                                    </div>
                                    <div className="review-footer">
                                        Reviewed: {r.reviewDate} | Hotel: <strong>{r.booking?.room?.hotel?.name}</strong>
                                    </div>
                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                        setSelectedReview(r);
                                        setShowModal(true);
                                    }}
                                    >
                                        Respond
                                    </button>

                                </div>

                            ))
                        }
                        {
                            showModal === true ?
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <span className="close-button" onClick={() => setShowModal(false)}>×</span>

                                        <form onSubmit={(e) => { response(e) }}>
                                            <div className="form-group">
                                                <label>Response for review</label>
                                                <div className="room-type">
                                                    <div className="room-type-header">
                                                        <div className="room-type-title">custmer Name : {selectedReview.booking?.customer?.name}</div>
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label className="form-required">Response Text</label>
                                                            <input type="text" required onChange={(e) => { setResponseText(e.target.value) }} />
                                                        </div>

                                                    </div>



                                                    <button type="submit" className="btn btn-primary" id="submit-hotel-btn">
                                                        <i className="fas fa-paper-plane"></i> Send Response
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                : ""
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsDashboard;
