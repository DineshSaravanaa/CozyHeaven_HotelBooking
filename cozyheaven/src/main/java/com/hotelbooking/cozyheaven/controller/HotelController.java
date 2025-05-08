package com.hotelbooking.cozyheaven.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import java.util.stream.Collectors;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hotelbooking.cozyheaven.dto.BookingsDto;
import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.HotelAvailability;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
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

public class HotelController {
	@Autowired
	private HotelService hotelService;
	@Autowired
	private HotelOwnerService hotelOwnerService;
	@Autowired
	private BookingService bookingService;
	@Autowired
	private ReviewService reviewService;

	@Autowired
	private BookingsDto bookingsDto;

	
	Logger logger = LoggerFactory.getLogger("HotelController");


	Logger logger = LoggerFactory.getLogger("HotelController");

	// Adding Hotel (POST)
	// 1) Get Hotel Fields From Req Body
	// 2) Get Owner By Principal
	// 3) Set Owner In Hotel
	// 4) Set Status and Availability
	// 5) Then Save In DB

	@PostMapping("/add")
	public Hotel addHotel(Principal principal, @RequestBody Hotel hotel) throws InvalidIDException {
		logger.info("Attempting to add a hotel for user:", principal.getName());
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		hotel.setHotelOwner(owner);
		hotel.setStatus(HotelStatus.PENDING);
		hotel.setIsAvailable(HotelAvailability.NO);
		logger.info("Hotel added successfully:", hotel.getName());
		return hotelService.addHotel(hotel);

	}

	// Get All Hotels With Respect To Owner (GET)
	// 1) Using Principal For Finding Owner
	// 2) Find List Hotels By Using Owner Id

	@GetMapping("/getbyowner")
	public List<Hotel> getHotelByOwnerID(Principal principal) throws InvalidIDException {
		logger.info("Attempting to get hotels for user:", principal.getName());
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		return hotelService.getHotelByOwnerID(owner.getId());

	}

	// Edit Hotel Details By confirm owning status (PUT)
	// 1) Get Hotel By Hotel Id (Path Variable)
	// 2) Get Owner By Principal
	// 3) Get Owner Id from Both Found Hotel And Found Owner
	// 4) If Id Equals Then Update The Fields

	@PutMapping("/update/{hotelid}")
	public Hotel updateHotel(@PathVariable int hotelid, Principal principal, @RequestBody Hotel hotelRequest)
			throws InvalidIDException {

		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		HotelOwner ownerVerify = hotelOwnerService.getOwnerByID(hotelFind.getHotelOwner().getId());

		if (owner.getId() == ownerVerify.getId()) {

			logger.info("Owner verified. Updating hotel details.");

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
			if (hotelRequest.getStatus() != null)
				hotelFind.setStatus(hotelRequest.getStatus());

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

		} else {
			logger.warn("Owner verification failed for hotel update.");
			throw new InvalidIDException("Hotel Owner Id Not Matching With Hotel Owning Properties");
		}

		return hotelService.addHotel(hotelFind);

	}

	// Delete Request For Hotel (DELETE)
	// 1) Get Hotel By Hotel Id (Path Variable)
	// 2) Get Owner By Principal
	// 3) Get Owner Id from Both Found Hotel And Found Owner
	// 4) If Id Equals Then Update The Fields

	@DeleteMapping("deleterequest/{hotelid}")
	public Hotel deleteHotel(@PathVariable int hotelid, Principal principal, @RequestBody Hotel hotel)
			throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(hotelFind.getHotelOwner().getId());
		HotelOwner ownerFromReq = hotelOwnerService.getOwnerByUsername(principal.getName());

		if (owner.getId() == ownerFromReq.getId()) {
			logger.info("Owner verified. Deleting hotel details.");
			hotelFind.setDeletionRequested(DeletionRequest.Yes);
			hotelFind.setDeletionReason(hotel.getDeletionReason());
		} else {
			logger.warn("Owner verification Failed.");
			throw new InvalidIDException("Hotel Owner Id Not Matching With Hotel Owning Properties");
		}
			
		return hotelService.addHotel(hotelFind);

	}

	// To Get Bookings By Specific Hotel (GET)
	// 1) Get Hotel By Hotel Id (Path Variable)
	// 2) Get Bookings By Hotel Id

	@GetMapping("/bookingbyhotel/{hotelid}")
	public List<Booking> getBookingByHotel(@PathVariable int hotelid) throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		List<Booking> booking = bookingService.getBookingByHotelID(hotelFind.getId());
		logger.info("Booking Fetched Successfully For Hotel :" + hotelid);
		return booking;
	}

	// To Get Bookings By All Hotels Owned By Specific Owner (GET)
	// 1) To Implement Pagination Add Req Param For Page And Size And Include
	// 2) Pageable Interface
	// 3) Get Owner Id By Principal
	// 4) Get Page Of Bookings By Using Owner Id And Pageable
	// 5) Use Booking Dto And Set Total Pages , List ....
	// 6) Then Return

	@GetMapping("/bookingbyowner")
	public BookingsDto getBookingByOwner(Principal principal, @RequestParam int page, @RequestParam int size)
			throws InvalidIDException {
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());

		Page<Booking> bookings = bookingService.getBookingByOwner(owner.getId(), pageable);
		bookingsDto.setList(bookings.getContent());
		bookingsDto.setSize(size);
		bookingsDto.setCurrentPage(page);
		bookingsDto.setTotalPages(bookings.getTotalPages());
		bookingsDto.setTotalElements((int) bookings.getTotalElements());
		logger.info("Booking Fetched Successfully For Owner :" + owner.getId());
		return bookingsDto;

	}

	// To Get Bookings By All Hotels Owned By Specific Owner (GET) - Without
	// Pagination
	// 1) Just Get List Of Bookings By Owner Id (Principal)

	@GetMapping("/bookingbyowner/all")
	public List<Booking> getAllBookingByOwner(Principal principal) {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		logger.info("Booking Fetched Successfully For Owner :" + owner.getId());
		return bookingService.getAllBookingByOwner(owner.getId());
	}

	// To Get Reviews By Specific Hotels (GET)
	// 1) By Using Hotel Id Get List Of Reviews

	@GetMapping("/reviewbyhotel/{hotelid}")
	public List<Review> getReviewByHotel(@PathVariable int hotelid) throws InvalidIDException {
		Hotel hotelFind = hotelService.findByHotelID(hotelid);
		logger.info("Review Fetched Successfully For Hotel :" + hotelFind.getId());
		return reviewService.getReviewByHotel(hotelFind.getId());
	}

	// To Get All Review By Owner (GET)
	// 1) By Using HotelOwner Id Get List Of Reviews

	@GetMapping("/reviewbyowner")
	public List<Review> getReviewByOwner(Principal principal) throws InvalidIDException {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		logger.info("Review Fetched Successfully For Owner :" + owner.getId());
		return reviewService.getReviewByOwner(owner.getId());
	}

	// To Reply For Review (PUT)
	// 1) Get Review By Review Id (Path Variable)
	// 2) Get Response Text From Req Body And Set To The Found Review

	@PutMapping("/review/response/{reviewid}")
	public Review responseReview(@PathVariable int reviewid, @RequestBody Review response) throws InvalidIDException {
		Review review = reviewService.getReviewById(reviewid);
		review.setResponseText(response.getResponseText());
		review.setResponseDate(response.getResponseDate());
		logger.info("Responsed For Review :"+reviewid);
		return reviewService.submitReview(review);
	}

	// To Get Pending Requests Of Hotel Verification (GET)
	// 1) Get Owner By Principal
	// 2) Get All Pending Hotels
	// 3) Filter It For The Specific Owner By Comparing Owner Id

	@GetMapping("/pendingrequest")
	public List<Hotel> pendingRequests(Principal principal) {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		List<Hotel> hotel = hotelService.getPendingRequests();
		logger.info("Pending Requests Successfully Fetched For Owner :" + owner.getId());
		return hotel.stream().filter(h -> h.getHotelOwner().getId() == owner.getId()).collect(Collectors.toList());
	}


	// To Get Deletion Requested Hotel (GET)
	// 1) Get Owner By Principal
	// 2) Get All Deletion Requested Hotels
	// 3) Filter It For The Specific Owner By Comparing Owner Id

	@GetMapping("/deletionrequested")
	public List<Hotel> deletionRequested(Principal principal) {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		List<Hotel> hotel = hotelService.getDeletionRequests();
		logger.info("Deletion Requests Successfully Fetched For Owner :" + owner.getId());
		return hotel.stream().filter(h -> h.getHotelOwner().getId() == owner.getId()).collect(Collectors.toList());
	}

	@PostMapping("/uploadImage/{hId}")
	public Hotel uploadImage(@PathVariable int hId, @RequestParam MultipartFile file)
			throws InvalidIDException, IOException {
		logger.info("Image Uploaded Successfully For Hotel" + hId);
		return hotelService.uploadImage(hId, file);

	}

}
