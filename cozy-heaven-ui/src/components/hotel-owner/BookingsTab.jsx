import React from 'react';

function BookingsContent() {
    // Dummy data - replace later
    const bookings = [
        { id: 'B1007', guest: 'Alice Smith', hotelName: 'Sunset Paradise', roomType: 'Deluxe Room', roomNo: '305', checkin: '2024-08-10', checkout: '2024-08-12', guests: 2, amount: 450.00, paymentStatus: 'Paid', transactionId: 'ch_1LpQ...', bookedOn: '2024-07-20' },
        { id: 'B1006', guest: 'Bob Johnson', hotelName: 'Mountain View', roomType: 'Standard Suite', roomNo: '101', checkin: '2024-08-15', checkout: '2024-08-18', guests: 1, amount: 600.00, paymentStatus: 'Paid', transactionId: 'py_3KoX...', bookedOn: '2024-07-18' },
        { id: 'B1005', guest: 'Charlie Brown', hotelName: 'Cozy Downtown', roomType: 'City View Queen', roomNo: '502', checkin: '2024-09-01', checkout: '2024-09-05', guests: 2, amount: 720.00, paymentStatus: 'Pending', transactionId: 'N/A', bookedOn: '2024-07-22' },
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'paid': return 'status-paid';
            case 'pending': return 'status-pending';
            case 'failed': return 'status-failed';
            default: return '';
        }
    };

  return (
    <div>
        <h2>Room Bookings</h2>
        {/* Filter Section - Using styles.css classes */}
        <div className="filter-section">
            <label htmlFor="booking-hotel-filter">Hotel:</label>
            <select id="booking-hotel-filter">
                <option value="">All Hotels</option>
                {/* Options populated by JS/State */}
                 <option value="hotel1">Sunset Paradise Resort</option>
            </select>
            <label htmlFor="booking-date-start">Date Range:</label>
            <input type="date" id="booking-date-start" />
            <span>to</span>
            <input type="date" id="booking-date-end" />
            <button className="btn btn-primary btn-sm"><i className="fas fa-filter"></i> Filter</button> {/* Use .btn styles */}
        </div>

        {/* Table Container - Using styles.css classes */}
        <div className="table-container">
            <table className="data-table"> {/* Use .data-table styles */}
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
                 <tbody id="bookings-table-body">
                     {bookings.length > 0 ? (
                         bookings.map(b => (
                             <tr key={b.id}>
                                 <td><strong>#{b.id}</strong></td>
                                 <td>{b.guest}</td>
                                 <td>{b.hotelName}</td>
                                 <td>{b.roomType}</td>
                                 <td>{b.roomNo}</td>
                                 <td>{b.checkin}</td>
                                 <td>{b.checkout}</td>
                                 <td>{b.guests}</td>
                                 <td>${b.amount.toFixed(2)}</td>
                                 <td><span className={`status-badge ${getStatusClass(b.paymentStatus)}`}>{b.paymentStatus}</span></td> {/* Use .status-badge */}
                                 <td>{b.transactionId}</td>
                                 <td>{b.bookedOn}</td>
                             </tr>
                         ))
                     ) : (
                        <tr><td colSpan="12" style={{textAlign:'center', color: 'var(--gray)'}}>No bookings found.</td></tr>
                     )}
                 </tbody>
            </table>
        </div>
    </div>
  );
}

export default BookingsContent;