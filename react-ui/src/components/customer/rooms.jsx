import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./rooms.css";

function Rooms() {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  const fetchRooms = async () => {
    try 
    {
      const response = await axios.get(`http://localhost:8080/api/room/getall/${hotelId}`);
      setRooms(response.data);
      setFilteredRooms(response.data);
    } 
    catch (error) 
    {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleBookNow = (room) => {
    navigate(`/booking/${room.id}`);
  };

  const handleBack = () => {
    navigate("/hotel"); 
  };

  return (
    <div className="rooms-container">
       {/* Navbar Section */}
       <div className="rooms-navbar">
        <button className="back-btn" onClick={()=>{handleBack()}}>← Back</button>
        <h2 className="hotel-title">ROOMS</h2>
      </div>

      {/* Rooms Display */}
      {filteredRooms.length > 0 ? (
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              {room.imageUrls && (
                <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511" className="room-image" />
              )}

              <div className="room-details">
                <h3>{room.name}</h3>
                <p><strong>Type:</strong> {room.type}</p>
                <p><strong>Price/Night:</strong> ${room.pricePerNight}</p>
                <p><strong>Max Guests:</strong> {room.maxCapacity}</p>
                <p><strong>Amenities:</strong> {room.aminities}</p>
                <p><strong>Status:</strong> {room.availabilityStatus}</p>

                {room.availabilityStatus.toLowerCase() === "available" ? (
                  <button className="book-now-btn" onClick={() => handleBookNow(room)}>
                    Book Now
                  </button>
                ) : (
                  <button className="book-now-btn" disabled style={{ backgroundColor: "gray", cursor: "not-allowed" }}>
                    Not Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No rooms available for this hotel.</p>
      )}
    </div>
  );
}

export default Rooms;
