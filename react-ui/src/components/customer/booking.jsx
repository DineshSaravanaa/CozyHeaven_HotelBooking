import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./booking.css";

function Booking() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try
      {
        const res = await axios.get(`http://localhost:8080/api/room/${roomId}`);
        setRoom(res.data);
      }
      catch (error) 
      {
        console.error("Failed to fetch room:", error);
        alert("Unable to load room details.");
      }
    };

    const storedCustomer = JSON.parse(localStorage.getItem('user'));
    if (storedCustomer) 
    {
        setCustomer(storedCustomer);
    }


    if (roomId) {
      fetchRoom();
    }
  }, [roomId]);

  const calculateAmount = () => {
    if (!checkIn || !checkOut || !room) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffDays = (end - start) / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays * room.pricePerNight : 0;
  };

  const handleBooking = async () => {
    if (!checkIn || !checkOut || !customer || !room || totalAmount <= 0) {
      alert("All fields are required, and valid dates should be entered.");
      return;
    }

    const bookingData = {
      checkIn,
      checkOut,
      capacity,
      totalAmount,
      status: "ON_PROCESS",
    };

    try {
      setIsBooking(true);
      const response = await axios.post(
        `http://localhost:8080/api/booking/add/${room.id}/${customer.id}`,
        bookingData
      );

      if (response.status === 200 || response.status === 201) 
      {
        localStorage.setItem("latestBooking", JSON.stringify(response.data));
        navigate(`/payment/${response.data.id}`);
      } 
      else 
      {
        alert("Failed to create booking. Please try again.");
      }
    } 
    catch (error) 
    {
      console.error("Booking failed:", error);
      alert("Error creating booking. Please try again.");
    } 
    finally 
    {
      setIsBooking(false);
    }
  };

  const handleCalculateTotal = () => {
    const amount = calculateAmount();
    setTotalAmount(amount);
  };

  if (!room) return <div>Loading...</div>;

  return (
    <div className="booking-container">
      <h1>Booking Room: {room.name}</h1>
      <h2>Hotel: {room.hotel?.name}</h2>

      <div className="booking-details">
        <p><strong>Type:</strong> {room.type}</p>
        <p><strong>Price Per Night:</strong> ${room.pricePerNight}</p>
        <p><strong>Max Guests:</strong> {room.maxCapacity}</p>
        <p><strong>Amenities:</strong> {room.aminities}</p>
        <p><strong>Status:</strong> {room.availabilityStatus}</p>
      </div>

      <div className="booking-form">
        <label>Check-In Date:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />

        <label>Check-Out Date:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />

        <label>No. of Guests:</label>
        <input
          type="number"
          min="1"
          max={room.maxCapacity}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          required
        />

        <button className="calculate-btn" onClick={handleCalculateTotal}>
          Calculate Total
        </button>

        {totalAmount > 0 && (
          <p className="total-amount">
            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
          </p>
        )}

        <button
          className="payment-btn"
          onClick={handleBooking}
          disabled={isBooking || totalAmount <= 0}
        >
          {isBooking ? "Processing..." : "Confirm & Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}

export default Booking;
