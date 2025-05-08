package com.hotelbooking.cozyheaven.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.VerificationRequest;
import com.hotelbooking.cozyheaven.service.VerificationRequestService;

@RestController
@RequestMapping("/api/verificationrequest")
public class VerificationRequestController {

	@Autowired
	private VerificationRequestService verificationRequestService;

	// 1)To Verify request Hotel Owner
	@PostMapping("/add/{ownerId}")
	public VerificationRequest addRequestOwner(@PathVariable int ownerId, @RequestBody VerificationRequest request)
			throws InvalidIDException {
		return verificationRequestService.addVerificationRequestOwner(ownerId, request);
	}

	// 2)To Approve Hotel Owner Verification
	@PutMapping("/approveOwner/{verificationid}")
	public VerificationRequest acceptRequestOwner(@PathVariable int verificationid) throws InvalidIDException {
		return verificationRequestService.acceptRequestOwner(verificationid);
	}

	// 3)To Reject Hotel Owner Verification
	@PutMapping("/rejectOwner/{verificationid}")
	public VerificationRequest rejectRequestOwner(@PathVariable int verificationid) throws InvalidIDException {
		return verificationRequestService.rejectRequestOwner(verificationid);
	}

	// 4) To Request Verification For Hotel
	@PostMapping("/add/{hotelId}")
	public VerificationRequest addRequest(@PathVariable int hotelId, @RequestBody VerificationRequest request)
			throws InvalidIDException {
		return verificationRequestService.addVerificationRequest(hotelId, request);
	}

	// 5)To Approve Hotel Verification
	@PutMapping("/approveHotel/{verificationid}")
	public VerificationRequest acceptRequest(@PathVariable int verificationid) throws InvalidIDException {
		return verificationRequestService.acceptRequest(verificationid);
	}

	// 6)To Reject Hotel Verification
	@PutMapping("/rejectHotel/{verificationid}")
	public VerificationRequest cancelRequest(@PathVariable int verificationid) throws InvalidIDException {
		return verificationRequestService.cancelRequest(verificationid);
	}

	// This api helps to get a specific verification request by its ID
	@GetMapping("/get/{id}")
	public VerificationRequest getRequestById(@PathVariable int id) throws InvalidIDException {
		return verificationRequestService.getRequestById(id);
	}

	// get Verification requests by hotelID
	@GetMapping("/getbyhotel/{hotelId}")
	public VerificationRequest getRequestsByHotel( @PathVariable int hotelId)
			throws InvalidIDException {
		return verificationRequestService.getRequestByHotel(hotelId);
	}
	// showcase the verification request by its pending status
	@GetMapping("/pending")
	public List<VerificationRequest> getPendingRequests() {
		return verificationRequestService.getPendingRequests();
	}
	// get Verification request by ownerID
	@GetMapping("/getbyowner/{ownerId}")
	public VerificationRequest getRequestsByOwner(@PathVariable int ownerId) throws InvalidIDException {
		return verificationRequestService.getRequestsByOwnerId(ownerId);
	}
	// get all verification request 
	@GetMapping("/all")
	public List<VerificationRequest> getAll() {
		return verificationRequestService.getAll();
	}
	
	@GetMapping("/pendingcount")
	public Long getByPendingCount() {
		return verificationRequestService.getByPendingCount();
	}
	
	@GetMapping("/approvedcount")
	public Long getByApprovedCount() {
		return verificationRequestService.getByApprovedCount();
	}
	
	@GetMapping("/cancelledcount")
	public Long getByCancelledCount() {
		return verificationRequestService.getByCancelledCount();
	}
	

	
}
