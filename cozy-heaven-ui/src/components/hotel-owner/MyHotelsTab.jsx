import React from 'react';

function MyHotelsContent() {
     // Dummy data - replace later
     const hotels = [
        { id: "hotel-1", name: "Sunset Paradise Resort", type: "luxury", totalRooms: 120, city: "Miami", country: "USA", status: 'approved', images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"], deletionRequested: false, isAvailable: true },
        { id: "hotel-2", name: "Mountain View Lodge", type: "boutique", totalRooms: 45, city: "Aspen", country: "USA", status: 'approved', images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"], deletionRequested: true, isAvailable: false }, // Example pending deletion
        { id: "hotel-4", name: "Cozy Heaven Downtown", type: "boutique", totalRooms: 60, city: "Chicago", country: "USA", status: 'approved', images: ["https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"], deletionRequested: false, isAvailable: true }
     ];

     const getStatusClass = (status) => `status-${status}`; // Matches styles.css: status-approved, status-pending, etc.
     const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

     const generateActionButtons = (hotel) => {
         let buttons = [
             <button key="details" className="btn btn-outline btn-sm view-hotel-btn" data-bs-toggle="modal" data-bs-target="#viewDetailsModal"><i className="fas fa-eye"></i> Details</button>
         ];
         if (hotel.status === 'approved') {
             buttons.push(<button key="edit" className="btn btn-secondary btn-sm edit-approved-hotel-btn"><i className="fas fa-edit"></i> Edit</button>);
             if (hotel.deletionRequested) {
                 buttons.push(<button key="pending" className="btn btn-warning btn-sm" disabled><i className="fas fa-hourglass-half"></i> Pending Deletion</button>);
             } else {
                 buttons.push(<button key="delete" className="btn btn-danger btn-sm delete-request-btn" data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fas fa-trash-alt"></i> Delete Req.</button>);
             }
         }
         // Add other status conditions if needed (e.g., edit pending)
         return buttons;
     }

  return (
    <div>
        <h2>My Hotels</h2>
        {/* Filter Section - Using styles.css classes */}
        <div className="filter-section">
            <input type="text" placeholder="Search my hotels..." id="my-hotels-search" style={{ flexGrow: 1 }} />
            <button className="btn btn-secondary btn-sm"><i className="fas fa-search"></i> Search</button>
        </div>

        {/* Hotels Grid - Using styles.css classes */}
        <div className="hotels-grid" id="my-hotels-grid">
            {hotels.length > 0 ? (
                hotels.map(hotel => {
                    const imageUrl = hotel.images.length > 0 ? hotel.images[0] : 'https://placehold.co/500x180/003366/FFFFFF?text=No+Image';
                    return (
                        <div key={hotel.id} className="hotel-card" data-hotel-id={hotel.id}>
                            <div className="hotel-image" style={{ backgroundImage: `url('${imageUrl}')` }}>
                                <span className={`hotel-status ${getStatusClass(hotel.status)}`}>{capitalize(hotel.status)}</span>
                            </div>
                            <div className="hotel-details">
                                <div className="hotel-name">{hotel.name}</div>
                                <div className="hotel-location">
                                    <i className="fas fa-map-marker-alt"></i> {hotel.city}, {hotel.country}
                                </div>
                                <div className="hotel-meta">
                                    <span className="hotel-type">{capitalize(hotel.type)}</span>
                                    <span className="hotel-rooms">{hotel.totalRooms} rooms</span>
                                </div>
                                <div className="hotel-actions">
                                    {generateActionButtons(hotel)}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p style={{textAlign:'center', color: 'var(--gray)', gridColumn: '1 / -1'}}>No approved hotels found.</p>
            )}
        </div>
    </div>
  );
}

export default MyHotelsContent;