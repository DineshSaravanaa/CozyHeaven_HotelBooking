import React from 'react';

function PendingRequestsContent() {
     // Dummy data - replace later
     const hotels = [
         { id: "hotel-3-pending", name: "Urban Oasis Hotel", type: "business", totalRooms: 80, city: "New York", country: "USA", status: 'pending', images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"]},
         { id: "hotel-5-pending", name: "Beachfront Bungalows", type: "resort", totalRooms: 25, city: "Malibu", country: "USA", status: 'pending', images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"]}
     ];

     const getStatusClass = (status) => `status-${status}`;
     const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

     const generateActionButtons = (hotel) => {
         // Actions specific to pending requests
         return [
             <button key="details" className="btn btn-outline btn-sm view-hotel-btn" data-bs-toggle="modal" data-bs-target="#viewDetailsModal"><i className="fas fa-eye"></i> Details</button>,
             <button key="edit" className="btn btn-secondary btn-sm edit-pending-hotel-btn"><i className="fas fa-edit"></i> Edit</button>,
             <button key="cancel" className="btn btn-danger btn-sm cancel-request-btn"><i className="fas fa-times"></i> Cancel</button>
         ];
     }

  return (
    <div>
        <h2>Pending Hotel Requests</h2>
        {/* Use .hotels-grid from styles.css */}
        <div className="hotels-grid" id="requests-grid">
             {hotels.length > 0 ? (
                hotels.map(hotel => {
                    const imageUrl = hotel.images.length > 0 ? hotel.images[0] : 'https://placehold.co/500x180/003366/FFFFFF?text=No+Image';
                    return (
                        <div key={hotel.id} className="hotel-card" data-hotel-id={hotel.id}> {/* Use .hotel-card */}
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
                 <p style={{textAlign:'center', color: 'var(--gray)', gridColumn: '1 / -1'}}>No pending requests.</p>
             )}
        </div>
    </div>
  );
}

export default PendingRequestsContent;