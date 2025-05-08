import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])
    const [originalBookings, setOriginalBookings] = useState([])

    const [hotels, setHotels] = useState([])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [selectedHId, setSelectedHId] = useState()

    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [pageArray, setPageArray] = useState([])

    useEffect(() => {

        const getBookings = async () => {
            try {

                let token = localStorage.getItem('token')
                let header = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                {/* 1) Get Bookings By Calling GET API (Bookings By Owner)
                    2) Set Bookings And Original Bookings (Filer Purpose We Need To Duplicate The Bookings)
                       Note:
                        When Using Filter The Booking State Only Changes After Reset Bookings Are Set From Original Bookings
                    3) Set Total Page For Pagination Purpose */}

                let response = await axios.get(`http://localhost:8083/api/hotel/bookingbyowner?page=${page}&size=10`, header)
                console.log(response)
                setBookings(response.data.list)
                setOriginalBookings(response.data.list)
                setTotalPage(response.data.totalPages)

                {/* 1) Creating temp Array And Push Numbers Like 1,2,3,.. By Using Total Pages Value (For Loop)
                    2) SetPageArray Using temp 
                    Note : Used For Dynamic Pagination */}

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

        getBookings()

    }, [page]) // Here Dependency Added As Page UseEffect Called Once Again If Page State Changes

    const filterBookings = async () => {
        if (selectedHId) {

            try {
                let token = localStorage.getItem('token')
                let header = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }

                {/* 1) If Hotel Selected Then Calling GET API Which Gives Bookings By Specific Hotel */ }

                let response = await axios.get(`http://localhost:8083/api/hotel/bookingbyhotel/${selectedHId}`, header)

                {/* If Dates Selected Then Return Bookings Within The Dates */ }

                if (startDate && endDate) {
                    const start = new Date(startDate)
                    const end = new Date(endDate)
                    const filtered = response.data.filter(b => {
                        const bookedDate = new Date(b.bookedAt.split('T')[0])
                        return bookedDate >= start && bookedDate <= end
                    })
                    setBookings(filtered);


                }
                else {
                    setBookings(response.data)
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
        setBookings(originalBookings)
        setStartDate(null)
        setEndDate(null)
    }


    return (
        <div className="bookings-page">
            <Navbar />
            <div className="container">
                {/* Page Header */}
                <div className="page-header">
                    <h1>Bookings</h1>
                    <div className="breadcrumb">
                        <Link to="/owner-dashboard">Home</Link>
                        <span className="breadcrumb-separator">/</span>
                        <span>Bookings</span>
                    </div>
                </div>

                {/* Bookings Content */}
                <div className="tab-content active">

                    <div className="filter-section">
                        <label htmlFor="booking-hotel-filter">Hotel:</label>
                        <select id="booking-hotel-filter" onChange={(e) => { setSelectedHId(e.target.value) }}>
                            <option value="">All Hotels</option>
                            {

                                hotels.map((h, index) => (
                                    <option key={index} value={h.id}>{h.name}</option>

                                ))
                            }
                        </select>
                        <label htmlFor="booking-date-filter">Date Range:</label>
                        <input type="date" id="booking-date-start" onChange={(e) => { setStartDate(e.target.value) }} />
                        <span>to</span>
                        <input type="date" id="booking-date-end" onChange={(e) => { setEndDate(e.target.value) }} />
                        <button className="btn btn-primary btn-sm" onClick={() => { filterBookings() }}>
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
                                    <th>Booking ID</th>
                                    <th>Guest Name</th>
                                    <th>Hotel</th>
                                    <th>Room Type</th>
                                    <th>Room No</th>
                                    <th>Check-in</th>
                                    <th>Check-out</th>
                                    <th>Guests</th>
                                    <th>Amount</th>
                                    <th>Payment Status</th>
                                    <th>Transaction ID</th>
                                    <th>Booked On</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {bookings.map((booking, index) => (
                                    
                                    <tr key={index}>
                                        <td><strong>#{booking.id}</strong></td>
                                        <td>{booking.customer?.name}</td>
                                        <td>{booking.room?.hotel?.name}</td>
                                        <td>{booking.room?.type}</td>
                                        <td>{booking.room?.id}</td>
                                        <td>{booking.checkIn}</td>
                                        <td>{booking.checkOut}</td>
                                        <td>{booking.capacity}</td>
                                        <td>{booking.toatlAmount}</td>

                                        {
                                            booking.status == 'CONFIRMED' ? <td><span className='status-approved'>
                                                {booking.status}
                                            </span>
                                            </td> : <td>
                                                <span className='status-rejected'>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        }


                                        <td>{booking.id}</td>
                                        <td>{booking.bookedAt}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className="pagination-wrapper">

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
                                        <button className="page-link" onClick={() => page < totalPage - 1 && setPage(page + 1)}>Next</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;