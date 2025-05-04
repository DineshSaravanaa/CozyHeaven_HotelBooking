package com.hotelbooking.cozyheaven.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.Payment;
import com.hotelbooking.cozyheaven.model.Review;
import com.hotelbooking.cozyheaven.repository.ReviewRepository;
import com.hotelbooking.cozyheaven.service.BookingService;
import com.hotelbooking.cozyheaven.service.HotelService;
import com.hotelbooking.cozyheaven.service.PaymentService;
import com.hotelbooking.cozyheaven.service.ReportService;


@RestController
@RequestMapping("/api/report")
@CrossOrigin(origins = {"http://localhost:5174/"})
public class ReportController
{



	@Autowired
	private BookingService bookingService;
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private HotelService hotelService;
	@Autowired
	private ReportService reportService;
	@Autowired
	private ReviewRepository reviewRepository;

	
	// 1 - list of bookings
	@GetMapping("/listofbookings")
	public List<Booking> getAllBooking()
	{
		return bookingService.getAllBooking();
	}
	
	//2 - Count of Bookings
	@GetMapping("/countofbookings")
	public long getCountOfBooking()
	{
		return bookingService.getCountOfBooking();
	}
	
	//3 - Find by date 
	@GetMapping("/getbooking/{bookdate}")
	public List<Booking> getListOfBookingByDate(@PathVariable LocalDateTime bookdate)
	{
		return bookingService.getListOfBookingByDate(bookdate);
	}
	
	//4 - Find By date Count
	@GetMapping("/getbookingcount/{bookdate}")
	public long getListOfBookingByDateCount(@PathVariable LocalDateTime bookdate)
	{
		return bookingService.getListOfBookingByDateCount(bookdate);
	}
	
	//5 - List of payments 
	@GetMapping("/getlistofpayment")
	public List<Payment> getListOfPayment()
	{
		return paymentService.getListOfPayment();
	}
	
	//6 - Total amount in the listofpayment(WHole Amount)
	@GetMapping("/getamountlist")
	public Double getAmountWithListOfPayment()
	{
		return paymentService.getAmountWithListOfPayment();
	}
	
	//7 - list of payments by date
	@GetMapping("/getlistofpayments/{paymentdate}")
	public List<Payment> getListOfPaymentByDate(@PathVariable LocalDateTime paymentdate)
	{
		return paymentService.getListOfPaymentByDate(paymentdate);
	}
	
	//8 - list of payments by date TotalAMountRevenue(Custom AMount)
	@GetMapping("/getamount/{paymentdate}")
	public Double getAmountByCustomDate(@PathVariable LocalDateTime paymentdate)
	{
		return paymentService.getAmountByCustomDate(paymentdate);
	}
	//9 - list of bookings by hotel (location) optional(hotelname)
	@GetMapping("/getbookingbylocation/{location}")
	public List<Booking> getBookingsByHotelLocation(@PathVariable String location)
	{
		return bookingService.getBookingByPlace(location);
	}
	
	
	//10 -  list of Hotels
	@GetMapping("/allhotels")
	public List<Hotel> getAllHotelsUnderUs()
	{
		return hotelService.getAllHotelsUnderUs();
	}
	
	//11 - total revenue by the hotel id
	@GetMapping("/totalamount/{hotelid}")
	public Double getTotalRevenueByHotelId(@PathVariable int hotelid)
	{
		return paymentService.getTotalRevenueByHotelId(hotelid);
	}
	
	//12 - List of Bookings By Custom Range of Date
	@GetMapping("/listofbookingsbycustom/{fromdate}/{todate}")
	public List<Booking> getListofBookingByCustom(@PathVariable LocalDateTime fromdate,@PathVariable LocalDateTime todate) throws Exception
	{
		return bookingService.getListofBookingByCustom(fromdate,todate);
	}
	
	
	// Get all Reviews for the Customer Analysis card in UI then we can filter the ratings and count of reviews 
	//Once we are done with that filteration we need to create the Chart and Diagrams
	
	
	//13 - Find the total amounts of each months and store it in array then give an response to ui
	@GetMapping("/monthly-revenue")
	public double[] getAllAmountsForEachMonth()
	{
		return reportService.calculateMonthlyRevenue();
	}
	
	//14 - Find the total no of bookings on the basis of monthly wise and store it in an array then pass to UI
		@GetMapping("/monthly-bookings")
		public double[] getAllBookingCountEachMonth()
		{
			return reportService.calculateMonthlyBookingCount();
		}
		
	//15 - get all Reviews
		@GetMapping("/all-reviews-count")
		public double getAllReviews()
		{
			return reviewRepository.count();
		}
	//16 - getting the list of ratings count for the graph data for frontend
		@GetMapping("/ratings-count")
		public double[] getRatingsCountForFrontend()
		{
			List<Review> reviewList = reviewRepository.findAll();
			double[] ratingsCount = new double[] {
				    reviewList.stream().filter(r -> r.getRating() == 1).count(),
				    reviewList.stream().filter(r -> r.getRating() == 2).count(),
				    reviewList.stream().filter(r -> r.getRating() == 3).count(),
				    reviewList.stream().filter(r -> r.getRating() == 4).count(),
				    reviewList.stream().filter(r -> r.getRating() == 5).count()
				};
			return ratingsCount;
		}
	
	
	
	
}