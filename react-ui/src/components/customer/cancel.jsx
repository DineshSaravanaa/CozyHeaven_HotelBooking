import { useParams,useNavigate } from "react-router";
import React, { useState } from 'react';
import axios from 'axios';
import "./cancel.css";
function Cancellation()
{
    const [details, setDetails] = useState("");
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");
    const {bookingId} = useParams();

    const navigate = useNavigate();

    const handleCancel = async (e) =>
    {
        e.preventDefault();
        if(!reason || !details)
        {
            setMessage("fill the required feilds");
            return;
        }
        const body =
        {
            details,
            reason,
        };
        try
        {
            await axios.post(`http://localhost:8080/api/cancellationrequest/cancel/${parseInt(bookingId)}`,body);
            navigate('/bookingHistory');
        }
        catch (error)
        {
            console.error(error);
            setMessage("try again cancelling");
        }
    };

    const handleBack = () =>
    {
        navigate('/bookingHistory');
    }

    return (
        <div>
            <div className="rooms-navbar">
                  <button className="back-btn" onClick={() => {handleBack()}}>← Back</button>
                   <h2 className="hotel-title">CANCELLATION REQUEST</h2>
            </div>
        <div className="cancellation-container">
          <h2>Submit Cancellation Request</h2>
    
          <label>Reason:</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason" />
    
          <label>Details:</label>
          <textarea
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Explain in detail"/>
    
          <button onClick={handleCancel}>Submit</button>
          {message && <p className="message">{message}</p>}
        </div>
        </div>
      );
}
export default Cancellation;