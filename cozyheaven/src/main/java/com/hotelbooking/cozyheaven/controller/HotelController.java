package com.hotelbooking.cozyheaven.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.HotelAvailability;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.exception.InvalidHotelNameException;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.model.Review;
import com.hotelbooking.cozyheaven.service.BookingService;
import com.hotelbooking.cozyheaven.service.HotelOwnerService;
import com.hotelbooking.cozyheaven.service.HotelService;
import com.hotelbooking.cozyheaven.service.ReviewService;

@RestController
@RequestMapping("/api/hotel")
@CrossOrigin(origins = {"http://localhost:5173/"})
public class HotelController {
	@Autowired
	private HotelService hotelService;
	@Autowired
	private HotelOwnerService hotelOwnerService;
	@Autowired
	private BookingService bookingService;
	@Autowired
	private ReviewService reviewService;

	// Adding Hotel With Owner ID
    @PostMapping("/add")
	public Hotel addHotel(Principal principal, @RequestBody Hotel hotel) throws InvalidIDException {

		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		hotel.setHotelOwner(owner);
		hotel.setStatus(HotelStatus.PENDING);
		hotel.setIsAvailable(HotelAvailability.NO);
		return hotelService.addHotel(hotel);

	}

	// Get All Hotels With Owner Id
	@GetMapping("/getbyowner")
	public List<Hotel> getHotelByOwnerID(Principal principal) throws InvalidIDException {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		return hotelService.getHotelByOwnerID(owner.getId());

	}

	// Get Hotel By Id
	@GetMapping("/getbyhotel/{hotelid}")
	public Hotel getHotelByID(@PathVariable int hotelid) throws InvalidIDException {

		return hotelService.findByHotelID(hotelid);

	}

	// Get Hotel By Name
	@GetMapping("/getbyname")
	public List<Hotel> getHotelByName(@RequestParam String name) throws InvalidHotelNameException {
		return hotelService.getByHotelName(name);

	}

	
	// Edit Hotel Details By confirm owning status
	@PutMapping("/update/{hotelid}/{ownerid}")
	public Hotel updateHotel(@PathVariable int hotelid,@PathVariable int ownerid, @RequestBody Hotel hotelRequest) throws InvalidIDException {

		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(hotelFind.getHotelOwner().getId());
		
		if(owner.getId()==ownerid) {
			if (hotelRequest.getName() != null)
			    hotelFind.setName(hotelRequest.getName());

			if (hotelRequest.getType() != null)
			    hotelFind.setType(hotelRequest.getType());

			if (hotelRequest.getDescription() != null)
			    hotelFind.setDescription(hotelRequest.getDescription());

			if (hotelRequest.getAddress() != null)
			    hotelFind.setAddress(hotelRequest.getAddress());

			if (hotelRequest.getCity() != null)
			    hotelFind.setCity(hotelRequest.getCity());

			if (hotelRequest.getState() != null)
			    hotelFind.setState(hotelRequest.getState());

			if (hotelRequest.getZip() != null)
			    hotelFind.setZip(hotelRequest.getZip());

			if (hotelRequest.getCountry() != null)
			    hotelFind.setCountry(hotelRequest.getCountry());

			if (hotelRequest.getContactEmail() != null)
			    hotelFind.setContactEmail(hotelRequest.getContactEmail());

			if (hotelRequest.getContact() != null)
			    hotelFind.setContact(hotelRequest.getContact());

			if (hotelRequest.getImageUrls() != null)
			    hotelFind.setImageUrls(hotelRequest.getImageUrls());

			if (hotelRequest.getIsAvailable() != null)
			    hotelFind.setIsAvailable(hotelRequest.getIsAvailable());

			if (hotelRequest.getCommonAmenities() != null)
			    hotelFind.setCommonAmenities(hotelRequest.getCommonAmenities());

			if (hotelRequest.getStarRating() != null)
			    hotelFind.setStarRating(hotelRequest.getStarRating());

		}
		else
			throw new InvalidIDException("Hotel Owner Id Not Matching With Hotel Owning Properties");
		return hotelService.addHotel(hotelFind);

	}

	// Delete Request For Hotel
	@DeleteMapping("deleterequest/{hotelid}/{ownerid}")
	public Hotel deleteHotel(@PathVariable int hotelid,@PathVariable int ownerid) throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(hotelFind.getHotelOwner().getId());
		
		if(owner.getId()==ownerid) {
		hotelFind.setDeletionRequested(DeletionRequest.Yes);
		}
		else
			throw new InvalidIDException("Hotel Owner Id Not Matching With Hotel Owning Properties");
		return hotelService.addHotel(hotelFind);

	}
	
	// To Get Approved Hotels
	@GetMapping("/approved")
	public List<Hotel> getApprovedHotels(){
		return hotelService.getHotelByApproval();
	}

	// To Get Bookings By Specific Hotel
	@GetMapping("/bookingbyhotel/{hotelid}")
	public List<Booking> getBookingByHotel(@PathVariable int hotelid) throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		List<Booking> booking = bookingService.getBookingByHotelID(hotelid);
		return booking;
	}

	// To Get Bookings By All Hotels Owned By Specific Owner
	@GetMapping("/bookingbyowner")
	public List<Booking> getBookingByOwner(Principal principal) throws InvalidIDException {
		
		HotelOwner owner=hotelOwnerService.getOwnerByUsername(principal.getName());
		
		return bookingService.getBookingByOwner(owner.getId());
	

	}

	// To Get Reviews By Specific Hotels
	@GetMapping("/reviewbyhotel/{hotelid}")
	public List<Review> getReviewByHotel(@PathVariable int hotelid) throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		return reviewService.getReviewByHotel(hotelid);
	}
	
	//To Get All Review By Owner
	@GetMapping("/reviewbyowner/{ownerid}")
	public List<Review> getReviewByOwner(@PathVariable int ownerid) throws InvalidIDException {
		HotelOwner owner=hotelOwnerService.getOwnerByID(ownerid);
		return reviewService.getReviewByOwner(ownerid);
	}

	// To Reply For Review
	@PutMapping("/review/response/{reviewid}")
	public Review responseReview(@PathVariable int reviewid, @RequestBody Review response) throws InvalidIDException {
		Review review = reviewService.getReviewById(reviewid);
		review.setResponseText(response.getResponseText());
		review.setResponseDate(response.getResponseDate());
		return reviewService.submitReview(review);
	}

	// To Get Pending Requests Of Hotel Verification
	@GetMapping("/pendingrequest")
	public List<Hotel> pendingRequests() {
		return hotelService.getPendingRequests();
	}
	
	// To Get Deletion Requested Hotel
	@GetMapping("/deletionrequested")
	public List<Hotel> deletionRequested(){
		return hotelService.getDeletionRequests(); 
	}
	
	// To Get Recent Bookings
	@GetMapping("/recent/bookings/{ownerid}")
	public List<Booking> recentBooking(@PathVariable int ownerid){
		List<Hotel> hotels=hotelService.getHotelByOwnerID(ownerid);
		List<Integer> hotelID=hotels.stream().map(t -> t.getId() ).toList();
	    LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
		return bookingService.getAllBooking().stream().filter(b->hotelID.contains(b.getRoom().getHotel().getId()))
		.filter(b->b.getBookedAt().isAfter(oneWeekAgo))
		.limit(7).toList();
	}
	

}

















