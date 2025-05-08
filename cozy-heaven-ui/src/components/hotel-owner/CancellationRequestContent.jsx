import React from 'react';

function CancellationsContent() {
    // Dummy data - replace later
    const cancellations = [
        { reqId: 'CR055', bookingId: 'B0987', guest: 'Eva Green', hotelName: 'Sunset Paradise', checkin: '2024-09-10', reqDate: '2024-07-21', reason: 'Change of plans', status: 'pending' },
        { reqId: 'CR054', bookingId: 'B0955', guest: 'Frank Castle', hotelName: 'Mountain View', checkin: '2024-08-25', reqDate: '2024-07-20', reason: 'Found alternative', status: 'approved' },
        { reqId: 'CR053', bookingId: 'B0912', guest: 'Grace Hopper', hotelName: 'Cozy Downtown', checkin: '2024-08-05', reqDate: '2024-07-19', reason: 'Medical emergency', status: 'pending' },
        { reqId: 'CR052', bookingId: 'B0888', guest: 'Henry Jones', hotelName: 'Sunset Paradise', checkin: '2024-07-30', reqDate: '2024-07-18', reason: 'Policy violation', status: 'rejected' },
    ];

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'status-pending-refund'; // Use classes from styles.css
            case 'approved': return 'status-approved-refund';
            case 'rejected': return 'status-rejected-refund';
            default: return '';
        }
    };
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

    const renderActions = (req) => {
        if (req.status === 'pending') {
            return (
                <>
                    <button className="btn btn-success btn-sm approve-cancel-btn" data-req-id={req.reqId}><i className="fas fa-check"></i> Approve</button>
                    <button className="btn btn-danger btn-sm reject-cancel-btn" data-req-id={req.reqId}><i className="fas fa-times"></i> Reject</button>
                </>
            );
        } else if (req.status === 'approved') {
            return <button className="btn btn-outline btn-sm" disabled><i className="fas fa-check-circle"></i> Approved</button>;
        } else {
            return <button className="btn btn-outline btn-sm" disabled><i className="fas fa-times-circle"></i> Rejected</button>;
        }
    };


  return (
    <div>
        <h2>Cancellation & Refund Requests</h2>
        {/* Filter Section - Use .filter-section */}
        <div className="filter-section">
            <label htmlFor="cancel-hotel-filter">Hotel:</label>
            <select id="cancel-hotel-filter">
                <option value="">All Hotels</option>
                 <option value="hotel1">Sunset Paradise Resort</option>
            </select>
            <label htmlFor="cancel-status-filter">Status:</label>
            <select id="cancel-status-filter">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
            <button className="btn btn-primary btn-sm"><i className="fas fa-filter"></i> Filter</button>
        </div>

        {/* Table Container - Use .table-container, .data-table, .status-badge */}
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
                     {cancellations.length > 0 ? (
                         cancellations.map(c => (
                            <tr key={c.reqId}>
                                <td>{c.reqId}</td>
                                <td>#{c.bookingId}</td>
                                <td>{c.guest}</td>
                                <td>{c.hotelName}</td>
                                <td>{c.checkin}</td>
                                <td>{c.reqDate}</td>
                                <td>{c.reason}</td>
                                <td><span className={`status-badge ${getStatusClass(c.status)}`}>{capitalize(c.status)}</span></td>
                                <td className="table-actions"> {/* Use .table-actions for spacing */}
                                    {renderActions(c)}
                                </td>
                            </tr>
                         ))
                     ) : (
                        <tr><td colSpan="9" style={{textAlign:'center', color: 'var(--gray)'}}>No cancellation requests found.</td></tr>
                     )}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default CancellationsContent;