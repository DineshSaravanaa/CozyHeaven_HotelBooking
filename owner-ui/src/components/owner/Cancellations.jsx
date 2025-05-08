import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";

const Cancellations = () => {

    const [cancellations, setCancellations] = useState([])
    const [originalCancellation, setOriginalCancellation] = useState([])
    const [selectedHId, setSelectedHId] = useState()
    const [status, setStatus] = useState()


    const [showConfirmationModal, setshowConfirmationModal] = useState(false)
    const [showReject, setShowReject] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [currentCancellation, setCurrentCancellation] = useState()
    const [hotels, setHotels] = useState([])

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState()
    const [pageArray, setPageArray] = useState([])

    const [approveReject,setApproveReject] = useState()

    let token = localStorage.getItem('token')
    let header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {

        const getCancellations = async () => {


            try {

                {/* Get All Cancellations By Owner
                     2) Set Cancellation And Original Cancellation (Filer Purpose We Need To Duplicate The Bookings)
                       Note:
                        When Using Filter The cancellation State Only Changes After Reset cancellation Are Set From Original cancellation
                    3) Set Total Page For Pagination Purpose */}

                let response = await axios.get(`http://localhost:8083/api/cancellationrequest/getbyhotelowner?page=${page}&size=${6}`, header)
                setCancellations(response.data.list)
                setOriginalCancellation(response.data.list)
                setTotalPages(response.data.totalPages)

                let temp = []
                for (let i = 0; i < response.data.totalPages; i++) {
                    temp.push(i)
                }
                setPageArray(temp)

                {/* 1) Get All Hotels And Store In Hotels For Fetching Names Of All Hotels */ }

                let response1 = await axios.get('http://localhost:8083/api/hotel/getbyowner', header)
                setHotels(response1.data)
            }
            catch (err) {

                console.log(err)

            }



        }
        getCancellations()

    }, [approveReject,page])

    const accept = async () => {

        try {

            {/* Approve Cancellations And Refund By Calling PUT API (Update Status) & POST API (Refund) */ }

            let response = await axios.put(`http://localhost:8083/api/cancellationrequest/accept/${currentCancellation.id}`, null, header)
            setApproveReject(response.data.status)
            await axios.post(`http://localhost:8083/api/refund/proceed/${currentCancellation.id}`, {
                "amountRefunded": currentCancellation.booking?.toatlAmount,
                "refundReason": "Booking cancellation",
                "refundStatus": "INITIATED",
                "processedDate": new Date().toISOString().slice(0, 19)
            }, header)
        }

        catch (err) {
            console.log(err)
        }
        setshowConfirmationModal(false)
        setShowSuccess(true)

    }

    const reject = async () => {

        try {

            {/* Reject Cancellation By Calling PUT API (Update Status) */ }

           let response = await axios.put(`http://localhost:8083/api/cancellationrequest/reject/${currentCancellation.id}`, null, header)
           setApproveReject(response.data.status)
        }

        catch (err) {
            console.log(err)
        }
        setShowReject(false)
        setShowSuccess(true)
    }

    const filterRequests = async () => {
        if (selectedHId) {

            try {

                {/* Filter Cancellation With Respect To Hotel Id */ }

                let resp = await axios.get(`http://localhost:8083/api/cancellationrequest/getbyhotel/${selectedHId}`, header)
                if (status) {

                    const filtered = resp.data.filter(r => r.status == status)
                    setCancellations(filtered)

                }


                else {
                    setCancellations(resp.data)
                }


            }

            catch (err) {

            }

        }
        else {
            alert("Please Select Hotel Name!!")
        }

    }
    const resetFilter = () => {
        setCancellations(originalCancellation)
    }
    return (
        <>
            <Navbar />


            <div className="container">
                <div className="page-header">
                    <h1 id="page-title">Cancellation & Refund Requests</h1>
                    <div className="breadcrumb">
                        <Link to="/owner-dashboard">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span id="current-page">Cancellations</span>
                    </div>
                </div>

                <div id="cancellations-content" className="tab-content active">

                    <div className="filter-section">
                        <label htmlFor="cancel-hotel-filter">Hotel:</label>
                        <select id="cancel-hotel-filter" onChange={(e) => { setSelectedHId(e.target.value) }}>
                            <option value="">All Hotels</option>
                            {
                                hotels.map((h, index) => (

                                    <option key={index} value={h.id}>{h.name}</option>
                                ))
                            }


                        </select>
                        <label htmlFor="cancel-status-filter">Status:</label>
                        <select id="cancel-status-filter" onChange={(e) => { setStatus(e.target.value) }}>
                            <option value="">All Status</option>
                            <option value="REQUESTED">Requests</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                        <button className="btn btn-primary btn-sm" onClick={() => { filterRequests() }}>
                            <i className="fas fa-filter"></i> Filter
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => { resetFilter() }}>
                            <i className="fas fa-filter"></i> Reset
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Booking ID</th>
                                    <th>Guest Name</th>
                                    <th>Hotel</th>
                                    <th>Check-in Date</th>
                                    <th>Request Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="cancellations-table-body">

                                {
                                    cancellations.map((c, index) => (
                                        <tr key={index}>
                                            <td>{c.id}</td>
                                            <td>{c.booking?.id}</td>
                                            <td>{c.booking?.customer?.name}</td>
                                            <td>{c.booking?.room?.hotel?.name}</td>
                                            <td>{c.booking?.checkIn}</td>
                                            <td>{c.requestDate}</td>
                                            <td>{c.reason}</td>
                                            <td>
                                                {
                                                    c.status == "APPROVED" ?
                                                        <span className="status-badge status-approved-refund">{c.status}</span> :
                                                        <span className="status-badge status-pending-refund">{c.status}</span>
                                                }
                                            </td>
                                            {
                                                c.status == "APPROVED" ?
                                                    <td className="table-actions">
                                                        <button className="btn btn-danger btn-sm" onClick={() => { setCurrentCancellation(c); setShowReject(true) }}><i className="fas fa-times"></i> Reject</button>
                                                    </td>
                                                    :
                                                    <td className="table-actions">


                                                        <button className="btn btn-success btn-sm" onClick={() => { setCurrentCancellation(c); setshowConfirmationModal(true) }}><i className="fas fa-check" ></i> Approve & Refund</button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => { setCurrentCancellation(c); setShowReject(true) }}><i className="fas fa-times"></i> Reject</button>
                                                    </td>
                                            }


                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="pagination-wrapper">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => page > 0 && setPage(page - 1)}>Previous</button>
                                </li>
                                {
                                    pageArray.map((p, index) => (

                                        <li className="page-item" key={index}>
                                            <button className="page-link" onClick={() => { setPage(p) }}>{p}</button>
                                        </li>

                                    ))
                                }
                                <li className="page-item">
                                    <button className="page-link" onClick={() => page < totalPages - 1 && setPage(page + 1)}>Next</button>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            {showConfirmationModal == true ?
                <div id="confirmation-modal" className="modal">
                    <div className="modal-content" style={{ maxWidth: '450px' }}>
                        <div className="modal-header">
                            <h2 id="confirmation-modal-title">Confirm Action</h2>
                            <button className="close-modal" data-target="confirmation-modal" onClick={() => { setshowConfirmationModal(false) }}>×</button>
                        </div>
                        <div className="modal-body">
                            <p id="confirmation-modal-message">Are you sure?</p>
                        </div>
                        <div className="modal-footer">

                            <button id="confirmation-modal-confirm" className="btn btn-primary" onClick={() => { accept() }}>Confirm Approve</button>
                        </div>
                    </div>
                </div>
                : ""
            }
            {showReject == true ?
                <div id="confirmation-modal" className="modal">
                    <div className="modal-content" style={{ maxWidth: '450px' }}>
                        <div className="modal-header">
                            <h2 id="confirmation-modal-title">Confirm Action</h2>
                            <button className="close-modal" data-target="confirmation-modal" onClick={() => { setShowReject(false) }}>×</button>
                        </div>
                        <div className="modal-body">
                            <p id="confirmation-modal-message">Are you sure?</p>
                        </div>
                        <div className="modal-footer">

                            <button id="confirmation-modal-confirm" className="btn btn-primary" onClick={() => { reject() }}>Confirm Reject</button>
                        </div>
                    </div>
                </div>
                : ""
            }

            {showSuccess == true ?

                <div id="success-modal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Success!</h2>
                            <button className="close-modal" data-target="success-modal" onClick={() => (setShowSuccess(false))}>×</button>
                        </div>
                        <div className="modal-body">
                            <p id="success-message">Action completed.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary close-modal-btn" data-target="success-modal" onClick={() => (setShowSuccess(false))}>OK</button>
                        </div>
                    </div>
                </div>
                : ""

            }

        </>
    );
};

export default Cancellations;
