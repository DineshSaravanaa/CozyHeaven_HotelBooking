import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import "./review.css";

function SubmitReview()
{
  const navigate = useNavigate();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const {bookingId} = useParams();

  const handleSubmit = async () => {
    if (!rating || !comment)
    {
      setMessage('Please fill in all required fields.');
      return;
    }
    try
    {
      const review =
      {
        rating,
        comment,
      };

      await axios.post(`http://localhost:8080/api/review/add/${bookingId}`, review);
      navigate('/bookingHistory');
    }
    catch (err)
    {
      console.error(err);
      setMessage('Failed to submit review.');
    }
  };

  const handleBack = () => 
  {
    navigate("/bookingHistory");

  }

  return (
    
    <div>

      <div className="rooms-navbar">
        <button className="back-btn" onClick={() => {handleBack()}}>← Back</button>
        <h2 className="hotel-title">REVIEW</h2>
      </div>

      <div className="review-form-container">
      <h2>Submit Your Review</h2>

      <label>Rating (1 to 5):</label>
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required/>

      <label>Comment:</label>
      <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} required/>

      <button onClick={handleSubmit}>Submit Review</button>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
}
export default SubmitReview;
