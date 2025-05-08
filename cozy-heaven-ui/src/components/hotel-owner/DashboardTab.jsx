import React from 'react';

function DashboardContent() {
    // Dummy Data - Replace later
    const stats = {
        totalHotels: 5,
        approvedHotels: 3,
        monthlyRevenue: '$12,345.67',
        newReviews: 8,
        pendingHotels: 2,
        deletionRequests: 0,
    };

    const activityFeed = [
        { iconClass: 'fa-calendar-check', typeClass: 'booking', title: 'New Booking Received', description: 'Booking #B1007 for "Sunset Paradise"', time: '15 mins ago' },
        { iconClass: 'fa-star', typeClass: 'review', title: 'New Review Posted', description: '4-star review for "Mountain View Lodge".', time: '1 hour ago' },
        { iconClass: 'fa-check-circle', typeClass: 'approved', title: 'Hotel Approved', description: '"Cozy Heaven Downtown" approved.', time: '1 day ago' },
        { iconClass: 'fa-hotel', typeClass: '', title: 'New Hotel Submitted', description: '"Beachfront Bungalows" pending.', time: '2 days ago' }, // Default icon bg
        { iconClass: 'fa-trash-alt', typeClass: 'deleted', title: 'Deletion Request Update', description: 'Info needed for "Old Inn" deletion.', time: '3 days ago' },
    ];

    return (
        // Use the .tab-content.active structure from styles.css if needed for transitions
        // otherwise, just render the content directly. Assuming direct render here.
        <div>
            {/* Stats Grid - Using styles.css classes */}
            <div className="stats-grid">
                {/* Stat Card Examples */}
                <div className="stat-card total"> {/* Apply .stat-card and variant like .total */}
                    <h3>Total Hotels</h3>
                    <p id="total-hotels">{stats.totalHotels}</p>
                </div>
                <div className="stat-card approved">
                    <h3>Approved Hotels</h3>
                    <p id="approved-hotels">{stats.approvedHotels}</p>
                </div>
                 <div className="stat-card revenue">
                    <h3>Revenue (Month)</h3>
                    <p id="monthly-revenue">{stats.monthlyRevenue}</p>
                </div>
                <div className="stat-card reviews">
                    <h3>New Reviews</h3>
                    <p id="new-reviews">{stats.newReviews}</p>
                </div>
                <div className="stat-card pending">
                    <h3>Pending Approval</h3>
                    <p id="pending-hotels">{stats.pendingHotels}</p>
                </div>
                <div className="stat-card requests">
                    <h3>Deletion Requests</h3>
                    <p id="deletion-requests">{stats.deletionRequests}</p>
                </div>
            </div>

            {/* Recent Activity - Using styles.css classes */}
            <div className="recent-activity">
                 <h2>Recent Activity</h2>
                 <div id="activity-feed">
                     {activityFeed.length > 0 ? (
                         activityFeed.map((item, index) => (
                             <div key={index} className="activity-item">
                                 <div className={`activity-icon ${item.typeClass}`}> {/* Apply .activity-icon and variant */}
                                     <i className={`fas ${item.iconClass}`}></i>
                                 </div>
                                 <div className="activity-details">
                                     <div className="activity-title">{item.title}</div>
                                     <div className="activity-description">{item.description}</div>
                                 </div>
                                 <div className="activity-time">{item.time}</div>
                             </div>
                         ))
                     ) : (
                        <p style={{textAlign: 'center', color: 'var(--gray)'}}>Loading activity...</p>
                     )}
                 </div>
            </div>
        </div>
    );
}

export default DashboardContent;