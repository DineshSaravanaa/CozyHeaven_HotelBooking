import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './payment.css';
import { useParams, useNavigate } from 'react-router';

function Payment() {
  const { bookingId } = useParams();  
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [amountPaid, setAmountPaid] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT');
  const [message, setMessage] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (!bookingId) 
    {
      setMessage(' No booking found.');
      return;
    }

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/booking/${bookingId}`);
        setBooking(response.data);
        setTotalAmount(response.data.totalAmount);  
      }
      catch (error) 
      {
        console.error('Failed to fetch booking details:', error);
        setMessage(' Failed to load booking details.');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePayment = async () => {
    if (parseFloat(amountPaid) !== parseFloat(totalAmount)) 
    {
      setMessage('Payment failed. The amount paid does not match the total amount. Please try again.');
      return;
    }

    const paymentData = 
    {
      amountPaid: parseFloat(amountPaid),
      totalAmount: parseFloat(totalAmount),
      paymentMethod,
      status: 'COMPLETED',
    };

    if (paymentMethod === 'CREDIT') 
    {
      if (!cardNumber || !expiryDate || !cvv) 
      {
        setMessage('Please fill in all credit card details.');
        return;
      }
      paymentData.cardNumber = cardNumber;
      paymentData.expiryDate = expiryDate;
      paymentData.cvv = cvv;
    } 
    else if (paymentMethod === 'DEBIT') 
    {
        if (!cardNumber || !expiryDate || !cvv) 
        {
          setMessage('Please fill in all credit card details.');
          return;
        }
        paymentData.cardNumber = cardNumber;
        paymentData.expiryDate = expiryDate;
        paymentData.cvv = cvv;
      } 
    else if (paymentMethod === 'UPI') 
    {
      if (!upiId)
      {
        setMessage(' Please enter a valid UPI ID.');
        return;
      }
      paymentData.upiId = upiId;
    }

    try
    {
      const response = await axios.post(
        `http://localhost:8080/api/payment/add/${bookingId}`,
        paymentData
      );
      navigate('/bookingHistory');
    }
    catch (error) 
    {
      console.error(error);
      setMessage('Payment failed. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>

      <label>Total Amount (fixed):</label>
      <input type="number" value={totalAmount} readOnly/>

      <label>Amount Paid:</label>
      <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} required/>

      <label>Payment Method:</label>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="CREDIT">Credit Card</option>
        <option value="DEBIT">Debit Card</option>
        <option value="UPI">UPI</option>
      </select>

      {/* Credit Card Form */}
      {paymentMethod === 'CREDIT' && (
        <div className="credit-card-form">
          <label>Card Number:</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter your card number" required/>
          
          <label>Expiry Date:</label>
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY" required/>

          <label>CVV:</label>
          <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)}
           placeholder="Enter CVV" required/>
        </div>
      )}

      {/* Debit Card Form */}
      {paymentMethod === 'DEBIT' && (
         <div className="credit-card-form">
         <label>Card Number:</label>
         <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
         placeholder="Enter your card number" required/>
         
         <label>Expiry Date:</label>
         <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
           placeholder="MM/YY" required/>

         <label>CVV:</label>
         <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)}
          placeholder="Enter CVV" required/>
       </div>
      )}

      {/* UPI Form */}
      {paymentMethod === 'UPI' && (
        <div className="upi-form">
          <label>UPI ID:</label>
          <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter your UPI ID" required/>
        </div>
      )}

      <button onClick={handlePayment}>Pay Now</button>

      {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default Payment;
