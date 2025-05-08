package com.hotelbooking.cozyheaven.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Payment;
import com.hotelbooking.cozyheaven.repository.PaymentRepository;

@Service
public class PaymentService 
{
	@Autowired
	private PaymentRepository paymentRepository;

	public Payment getPaymentById(int paymentId) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Payment> optional = paymentRepository.findById(paymentId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("payment ID is invalid...");
		}
		return optional.get();
	}

	public Payment getPaymentsByBookingId(int bookingId) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Payment> optional = paymentRepository.findByBookingId(bookingId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("booking ID is invalid...");
		}
		return optional.get();
	}

//	public Payment getPaymentsByCustomerId(int customerId) throws InvalidIDException 
//	{
//		// TODO Auto-generated method stub
//		Optional<Payment> optional = paymentRepository.findByCustomer_Id(customerId);
//		if(optional.isEmpty())
//		{
//			throw new InvalidIDException("customer ID is invalid...");
//		}
//		return optional.get();
//	}

	public Payment getPaymentStatus(int paymentId) throws InvalidIDException 
	{
		// TODO Auto-generated method stub
		Optional<Payment> optional = paymentRepository.findById(paymentId);
		if(optional.isEmpty())
		{
			throw new InvalidIDException("status is incorrect...");
		}
		return optional.get();
	}

	public Payment updatePaymentStatus(Payment payment) 
	{
		// TODO Auto-generated method stub
		return paymentRepository.save(payment);
	}

	public Payment makePayment(Payment payment) {
		// TODO Auto-generated method stub
		return paymentRepository.save(payment);
	}

}
