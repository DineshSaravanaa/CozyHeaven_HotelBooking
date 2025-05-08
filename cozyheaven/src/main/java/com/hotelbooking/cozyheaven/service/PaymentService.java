package com.hotelbooking.cozyheaven.service;

import java.time.LocalDateTime;
import java.util.List;
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

	public List<Payment> getListOfPayment() 
	{
		return paymentRepository.findAll();
	}

	public Double getAmountWithListOfPayment() 
	{
		List<Payment> payment = paymentRepository.findAll();
		
		List<Double> totalAmounts = payment.stream().filter(p->p.getStatus().toString() == "COMPLETED")
                .map(Payment::getAmountPaid)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .toList();
		
		double totalSum = totalAmounts.stream()
                .mapToDouble(Double::doubleValue)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .sum();
		
		return totalSum;
	}

	public List<Payment> getListOfPaymentByDate(LocalDateTime paymentdate) 
	{
		return paymentRepository.findByPaymentDate(paymentdate);
	}

	public Double getAmountByCustomDate(LocalDateTime paymentdate) 
	{
		List<Payment> payment = paymentRepository.findByPaymentDate(paymentdate);
		List<Double> totalAmounts = payment.stream()
                .map(Payment::getAmountPaid)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .toList();
		
		double totalSum = totalAmounts.stream()
                .mapToDouble(Double::doubleValue)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .sum();
		
		return totalSum;
	}

	public Double getTotalRevenueByHotelId(int hotelid) 
	{
		List<Payment> payment = paymentRepository.findByBookingRoomHotelId(hotelid);
		List<Double> totalAmounts = payment.stream()
                .map(Payment::getAmountPaid)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .toList();
		
		double totalSum = totalAmounts.stream()
                .mapToDouble(Double::doubleValue)//this is method reference operator which refers a method without invoke it and this is a cleaner way of working instead of traditional Lamda expression
                .sum();
		return totalSum;
	}

}
