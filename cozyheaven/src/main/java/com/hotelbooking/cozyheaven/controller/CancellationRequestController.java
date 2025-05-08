package com.hotelbooking.cozyheaven.controller;

import java.security.Principal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hotelbooking.cozyheaven.dto.CancellationRequestDto;
import com.hotelbooking.cozyheaven.enums.Status;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.model.CancellationRequest;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.service.BookingService;
import com.hotelbooking.cozyheaven.service.CancellationRequestService;
import com.hotelbooking.cozyheaven.service.HotelOwnerService;


@RestController
@RequestMapping("/api/cancellationrequest")
public class CancellationRequestController {

	@Autowired
	private CancellationRequestService cancellationRequestService;
	@Autowired
	private BookingService bookingService;

	@Autowired
	private HotelOwnerService hotelOwnerService;

	@Autowired
	private CancellationRequestDto dto;

	Logger logger = LoggerFactory.getLogger("HotelController");

	// To Make CancellationRequest (POST)
	// 1) Get Booking By Booking Id (Path Variable)
	// 2) You Have Cancellation Req Body
	// 3) Set Booking In Cancellation Request And Save

	@PostMapping("/add/{bookingID}")
	public CancellationRequest cancellBooking(@PathVariable int bookingID,
			@RequestBody CancellationRequest cancellationRequest) throws InvalidIDException {

		logger.info("Attempting Cancellation For Booking ID:" + bookingID);
		Booking booking = bookingService.getBookingById(bookingID);
		cancellationRequest.setBooking(booking);
		return cancellationRequestService.cancellBooking(cancellationRequest);

	}

	// To Get Cancellations By All Hotels Owned By Specific Owner (GET)
	// 1) To Implement Pagination Add Req Param For Page And Size And Include
	// 2) Pageable Interface
	// 3) Get Owner Id By Principal
	// 4) Get Page Of Cancellations By Using Owner Id And Pageable
	// 5) Use Cancellation Dto And Set Total Pages , List ....
	// 6) Then Return

	@GetMapping("/getbyhotelowner")
	public CancellationRequestDto getByHotelOwner(Principal principal, @RequestParam int page, @RequestParam int size)
			throws InvalidIDException {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

		Page<CancellationRequest> requests = cancellationRequestService.getByHotelOwner(owner.getId(), pageable);
		dto.setList(requests.getContent());
		dto.setSize(size);
		dto.setTotalPages(requests.getTotalPages());
		dto.setCurrentPage(page);
		dto.setTotalElements((int) requests.getTotalElements());
		logger.info("Cancellations Fetched Successfully For Owner :" + owner.getName());
		return dto;

	}

	// To Get Cancellations By All Hotels Owned By Specific Owner (GET)
	// 1) Get Owner By Principal
	// 2) Using Owner Id Get List Of Cancellations

	@GetMapping("/getbyhotelowner/all")
	public List<CancellationRequest> getAllByOwner(Principal principal) {
		HotelOwner owner = hotelOwnerService.getOwnerByUsername(principal.getName());
		logger.info("Cancellations Fetched Successfully For Owner :" + owner.getName());
		return cancellationRequestService.getAllByOwner(owner.getId());

	}

	// Get Cancellation For Specific Hotel (GET)
	// 1) Get Hotel Id (Path Variable) And Return List Of Cancellations

	@GetMapping("/getbyhotel/{hotelid}")
	public List<CancellationRequest> getByHotel(@PathVariable int hotelid) {
		logger.info("Cancellations Fetched Successfully For Hotel :" + hotelid);
		return cancellationRequestService.getByHotel(hotelid);
	}

	// To Accept Cancellation Request (PUT)
	// 1) Get Cancellation Request By Id (Path Variable) And Set Status As APPROVED

	@PutMapping("/accept/{cancellationID}")
	public CancellationRequest acceptCancellation(@PathVariable int cancellationID) throws InvalidIDException {
		CancellationRequest request = cancellationRequestService.findByID(cancellationID);
		request.setStatus(Status.APPROVED);
		logger.info(" Cancellation For Booking ID:" + request.getBooking().getId() + "Is Accepted");
		return cancellationRequestService.cancellBooking(request);
	}

	// To Reject Cancellation Request (PUT)
	// 1) Get Cancellation Request By Id (Path Variable) And Set Status As REJECTED

	@PutMapping("/reject/{cancellationID}")
	public CancellationRequest rejectCancellation(@PathVariable int cancellationID) throws InvalidIDException {
		CancellationRequest request = cancellationRequestService.findByID(cancellationID);
		request.setStatus(Status.REJECTED);
		logger.info("Attempting Cancellation For Booking ID:" + request.getBooking().getId() + "Is Rejected");
		return cancellationRequestService.cancellBooking(request);
	}

}
