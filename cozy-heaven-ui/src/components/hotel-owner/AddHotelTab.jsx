import React, { useState } from 'react';

// Helper component for a single room type in the form
function RoomTypeInput({ id, index, onRemove, isFirst, roomData = {} }) {
     const defaultAmenities = ['AC', 'TV', 'WiFi', 'Mini Bar', 'Safe', 'Hair Dryer', 'Balcony', 'Bathtub', 'Desk', 'Heating', 'Coffee Maker'];
     const currentAmenities = roomData.amenities || [];

    return (
        <div className="room-type" data-id={id}>
            <div className="room-type-header">
                <div className="room-type-title">Room Type #{index + 1}</div>
                <button
                    type="button"
                    className="remove-room-type"
                    onClick={() => onRemove(id)}
                    disabled={isFirst}
                    title={isFirst ? "Cannot remove the first room type" : "Remove this room type"}
                >
                    × {/* Using HTML entity for 'x' */}
                </button>
            </div>
            {/* Form Rows for Room Details */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor={`room-name-${id}`} className="form-required">Room Name</label>
                    <input type="text" id={`room-name-${id}`} required defaultValue={roomData.name || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor={`room-price-${id}`} className="form-required">Price/Night ($)</label>
                    <input type="number" id={`room-price-${id}`} required min="0" step="0.01" defaultValue={roomData.price || ''} />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor={`room-beds-${id}`} className="form-required">Bed Config</label>
                    <select id={`room-beds-${id}`} required defaultValue={roomData.beds || ''}>
                        <option value="">Select</option>
                        <option value="1-single">1 Single</option>
                        <option value="1-double">1 Double</option>
                        <option value="1-queen">1 Queen</option>
                        <option value="1-king">1 King</option>
                        <option value="2-singles">2 Singles</option>
                        <option value="2-doubles">2 Doubles</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor={`room-quantity-${id}`} className="form-required">Quantity</label>
                    {/* Add room-quantity-input class if needed by CSS/JS */}
                    <input type="number" className="room-quantity-input" id={`room-quantity-${id}`} required min="1" defaultValue={roomData.quantity || '1'} />
                </div>
            </div>
            <div className="form-group">
                <label>Room Amenities</label>
                 {/* Use amenities-grid class */}
                <div className="amenities-grid">
                    {defaultAmenities.map(amenity => (
                        <label key={amenity} className="amenity-checkbox"> {/* Use .amenity-checkbox */}
                            <input
                                type="checkbox"
                                name={`amenities-${id}`}
                                value={amenity}
                                defaultChecked={currentAmenities.includes(amenity)}
                            />
                            <span>{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}


function AddEditHotelContent() {
    const [isEditing, setIsEditing] = useState(false); // Example state
    const [editingHotelId, setEditingHotelId] = useState(null);
    const [hotelName, setHotelName] = useState(''); // Example: To update title
    const [roomTypes, setRoomTypes] = useState([{ id: `room-${Date.now()}` }]); // Start with one

    // --- Simplified Form State Management ---
    // In a real app, use controlled components or libraries like React Hook Form

    const addRoomType = () => {
        setRoomTypes([...roomTypes, { id: `room-${Date.now()}` }]);
    };

    const removeRoomType = (idToRemove) => {
        if (roomTypes.length > 1) {
            setRoomTypes(roomTypes.filter(rt => rt.id !== idToRemove));
        } else {
            alert("You must have at least one room type.");
        }
    };

     // TODO: Add function to calculate total rooms based on roomTypes state
     const calculateTotalRooms = () => {
        // Get all quantity inputs and sum them up
        // This is harder without direct DOM access or controlled inputs
        // For now, return placeholder or implement proper state handling
        const quantities = document.querySelectorAll('.room-quantity-input');
        let total = 0;
        quantities.forEach(input => { total += parseInt(input.value, 10) || 0; });
        const totalInput = document.getElementById('total-rooms');
        if(totalInput) totalInput.value = total;
        return total;
     };

     // Effect to recalculate when roomTypes change (might need debounce in real app)
     useEffect(() => {
         calculateTotalRooms();
     }, [roomTypes]);

     const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Add form validation logic here
        console.log("Form submitted (implement logic)");
        // Gather data from form (requires controlled inputs or FormData)
        // Submit data to backend
     };

     const handleCancel = () => {
         console.log("Form cancelled");
         // Reset form state, maybe navigate away
         setRoomTypes([{ id: `room-${Date.now()}` }]); // Reset to one room type
         // TODO: Clear other form fields
     };

  return (
    // Use .form-container class
    <div className="form-container">
        {/* Use .form-header */}
        <div className="form-header">
            <h2 id="add-edit-hotel-title">{isEditing ? `Edit Hotel: ${hotelName}` : 'Add New Hotel'}</h2>
            <p>Fill out the form below. All fields marked with <span className="text-danger">*</span> are required.</p> {/* Assuming text-danger is acceptable */}
        </div>

        <form id="hotel-form" onSubmit={handleSubmit}>
            <input type="hidden" id="editing-hotel-id" value={editingHotelId || ""} />

            {/* Use .form-group */}
            <div className="form-group">
                <label htmlFor="hotel-name-input" className="form-required">Hotel Name</label>
                <input type="text" id="hotel-name-input" required placeholder="Enter your hotel name" onChange={e => setHotelName(e.target.value)} />
            </div>

            {/* Use .form-row */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="hotel-type" className="form-required">Hotel Type</label>
                    <select id="hotel-type" required>
                        <option value="">Select hotel type</option>
                        <option value="budget">Budget</option>
                        <option value="boutique">Boutique</option>
                        <option value="luxury">Luxury</option>
                        <option value="resort">Resort</option>
                        <option value="business">Business</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="total-rooms" className="form-required">Total Rooms (Calculated)</label>
                    {/* Disabled style comes from styles.css */}
                    <input type="number" id="total-rooms" required placeholder="Auto-calculated" min="1" readOnly style={{ cursor: 'not-allowed' }} title="Total rooms calculated from room types below" />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description" className="form-required">Description</label>
                <textarea id="description" rows="4" required placeholder="Describe your hotel..."></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="amenities" className="form-required">Common Amenities</label>
                <input type="text" id="amenities" required placeholder="e.g. Pool, WiFi, Restaurant, Spa" />
                <small className="form-hint">Separate amenities with commas</small>
            </div>

            {/* Room Types Section */}
            <div className="form-group">
                <label className="form-required">Room Types</label>
                {/* Use .room-types-container */}
                <div className="room-types-container" id="room-types-container">
                    {roomTypes.map((rt, index) => (
                        <RoomTypeInput
                            key={rt.id}
                            id={rt.id}
                            index={index}
                            onRemove={removeRoomType}
                            isFirst={roomTypes.length === 1}
                            // Pass existing room data if editing: roomData={existingHotelData.roomTypes[index]}
                        />
                    ))}
                </div>
                 {/* Use .add-room-type-btn */}
                <button type="button" className="add-room-type-btn" id="add-room-type" onClick={addRoomType}>
                    <i className="fas fa-plus"></i> Add Room Type
                </button>
            </div>

             {/* Address Fields */}
             <div className="form-row">
                 <div className="form-group">
                     <label htmlFor="address" className="form-required">Address</label>
                     <input type="text" id="address" required placeholder="Street address" />
                 </div>
                 <div className="form-group">
                     <label htmlFor="city" className="form-required">City</label>
                     <input type="text" id="city" required placeholder="City" />
                 </div>
             </div>
             <div className="form-row">
                 <div className="form-group">
                     <label htmlFor="state" className="form-required">State/Region</label>
                     <input type="text" id="state" required placeholder="State or region" />
                 </div>
                 <div className="form-group">
                     <label htmlFor="zip" className="form-required">ZIP/Postal Code</label>
                     <input type="text" id="zip" required placeholder="Postal code" />
                 </div>
             </div>
             <div className="form-group">
                 <label htmlFor="country" className="form-required">Country</label>
                 <input type="text" id="country" required placeholder="Country" />
             </div>

             {/* Contact Fields */}
             <div className="form-row">
                 <div className="form-group">
                     <label htmlFor="contact-email" className="form-required">Contact Email</label>
                     <input type="email" id="contact-email" required placeholder="Contact email" />
                 </div>
                 <div className="form-group">
                     <label htmlFor="contact-phone" className="form-required">Contact Phone</label>
                     <input type="tel" id="contact-phone" required placeholder="Contact phone" />
                 </div>
             </div>

             {/* Image Fields */}
             <div className="form-group">
                 <label htmlFor="images">Hotel Images (URLs)</label>
                 <input type="text" id="images" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                 <small className="form-hint">Enter image URLs separated by commas</small>
             </div>

            {/* Form Actions - Use .form-actions and .btn styles */}
            <div className="form-actions">
                <button type="button" className="btn btn-outline" id="cancel-form" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary" id="submit-hotel-btn">
                    <i className="fas fa-paper-plane"></i> {isEditing ? 'Update Hotel' : 'Submit for Approval'}
                </button>
            </div>
        </form>
    </div>
  );
}

export default AddEditHotelContent;