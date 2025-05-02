package com.hotelbooking.cozyheaven.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.model.Payment;
import com.hotelbooking.cozyheaven.repository.BookingRepository;


@Service
public class ReportService 
{
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private BookingRepository bookingRepository;
//For dataset in UI Projection of Charts
	public double[] calculateMonthlyRevenue() 
	{
		// fetch all payments
		List<Payment>  paymentlist = paymentService.getListOfPayment();
		return calculateRevenue(paymentlist);
		//filter them according to the month(using split)
		//then calculate the sum total of each month
		//add it to the list then return it
		
	}

	 private double[] calculateRevenue(List<Payment> payments) {
	        double[] monthlyRevenue = new double[12]; // Array to hold revenue for each month (Jan-Dec)

	        // Use the existing logic to calculate monthly revenue
	        for (Payment payment : payments) {
	            String paymentDate = payment.getPaymentDate().toString();
//	            System.out.println(paymentDate);
	            int month = extractMonthFromDate(paymentDate); // Extract month (1-12)
	            monthlyRevenue[month - 1] += payment.getAmountPaid(); // Month is 1-based, so adjust index
	        }
	        return monthlyRevenue;
	 }
	 private int extractMonthFromDate(String dateString) {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
	        LocalDateTime paymentDate = LocalDateTime.parse(dateString, formatter);
	        return paymentDate.getMonthValue();
	    }
///////////////////////////////////////////////////		Monthly Bookings Count Goes Here    ///////////////////////////////////////////////////////////////////////////////////////////

	 public double[] calculateMonthlyBookingCount() 
		{
			List<Booking> bookinglist = bookingRepository.findAll();
			return calculateBookingCount(bookinglist);
		}
		public double[] calculateBookingCount(List<Booking> bookings)
		{
			double[] monthlyBooking = new double[12];
			for(Booking booking : bookings)
			{
				String bookingDate = booking.getBookedAt().toString();
				int month = extractMonthFromDate(bookingDate);
				monthlyBooking[month-1] += 1;
			}
			return monthlyBooking;
		}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


