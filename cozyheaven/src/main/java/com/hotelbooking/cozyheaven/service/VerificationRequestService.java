package com.hotelbooking.cozyheaven.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.enums.ApprovalStatus;
import com.hotelbooking.cozyheaven.enums.HotelAvailability;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.enums.IsVerified;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.model.VerificationRequest;
import com.hotelbooking.cozyheaven.repository.VerificationRequestRepository;

@Service
public class VerificationRequestService {
	@Autowired
	private VerificationRequestRepository verificationRequestRepository;

	@Autowired
	private HotelOwnerService hotelOwnerService;

	@Autowired
	private HotelService hotelService;

	//1) add request for owner
	public VerificationRequest addVerificationRequestOwner(int ownerId, VerificationRequest request)
			throws InvalidIDException {
		HotelOwner owner = hotelOwnerService.getOwnerByID(ownerId);
		request.setHotelOwner(owner);
		return verificationRequestRepository.save(request);
	}
    //2)To Approve Owner
	public VerificationRequest acceptRequestOwner(int verificationid) throws InvalidIDException {
		VerificationRequest request = getRequestById(verificationid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(request.getHotelOwner().getId());
		owner.setIsVerified(IsVerified.Verified);
		request.setStatus(ApprovalStatus.APPROVED);
		return request;

	}
    //3)To Reject Owner
	public VerificationRequest rejectRequestOwner(int verificationid) throws InvalidIDException {
		VerificationRequest request = getRequestById(verificationid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(request.getHotelOwner().getId());
		owner.setIsVerified(IsVerified.NotVerified);
		request.setStatus(ApprovalStatus.CANCELLED);
		return request;

	}

	// 4)Add new verification request For Hotel
	public VerificationRequest addVerificationRequest(int hotelId, VerificationRequest request)
			throws InvalidIDException {
		Hotel hotel = hotelService.findByHotelID(hotelId);
		HotelOwner owner = hotelOwnerService.getOwnerByID(hotel.getHotelOwner().getId());

		request.setHotelOwner(owner);
		request.setHotel(hotel);
		request.setStatus(ApprovalStatus.PENDING);

		return verificationRequestRepository.save(request);
	}

	// 5)Approve Hotel request
	public VerificationRequest acceptRequest(int verificationid) throws InvalidIDException {
		VerificationRequest request = getRequestById(verificationid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(request.getHotelOwner().getId());
		if (owner.getIsVerified() == IsVerified.Verified) {
			request.setStatus(ApprovalStatus.APPROVED);
			request.getHotel().setStatus(HotelStatus.APPROVED);
			request.getHotel().setIsAvailable(HotelAvailability.YES);
			request.getHotel().setApprovedAt(LocalDateTime.now());
		} else
			throw new InvalidIDException("Hotel Owner Not Verified");
		return verificationRequestRepository.save(request);
	}

	// 6)Cancel Hotel request
	public VerificationRequest cancelRequest(int verificationid) throws InvalidIDException {
		VerificationRequest request = getRequestById(verificationid);
		HotelOwner owner = hotelOwnerService.getOwnerByID(request.getHotelOwner().getId());
		if (owner.getIsVerified() == IsVerified.Verified) {
			request.setStatus(ApprovalStatus.CANCELLED);
			request.getHotel().setStatus(HotelStatus.REJECTED);
			request.getHotel().setIsAvailable(HotelAvailability.NO);
		} else
			throw new InvalidIDException("Hotel Owner Not Verified");

		return verificationRequestRepository.save(request);
	}

	// Get by ID
	public VerificationRequest getRequestById(int id) throws InvalidIDException {
		Optional<VerificationRequest> optional = verificationRequestRepository.findById(id);
		if (optional.isEmpty())
			throw new InvalidIDException("Verification Request ID does not exist!");
		return optional.get();
	}

	// Get all requests by hotelId
	public VerificationRequest getRequestByHotel( int hotelId) throws InvalidIDException {
		Hotel hotel = hotelService.findByHotelID(hotelId);
		return verificationRequestRepository.findByHotelId(hotel.getId());
	}

	// Show all pending requests
	public List<VerificationRequest> getPendingRequests() {
		return verificationRequestRepository.findByStatus(ApprovalStatus.PENDING);
	}

	
	// Get verification requests by ownerId
	public VerificationRequest getRequestsByOwnerId(int ownerId) throws InvalidIDException {
		HotelOwner owner = hotelOwnerService.getOwnerByID(ownerId);
		return verificationRequestRepository.findByHotelOwnerId(owner.getId());
	}
	
	// get all the verification list
	public List<VerificationRequest> getAll() {
		return verificationRequestRepository.findAll();
	}
	
	
public Long getByPendingCount() {
		
		List<VerificationRequest> verificationRequests = verificationRequestRepository.findAll();
		long totalpendings =  verificationRequests.stream().filter(v->v.getStatus().toString() == "PENDING").count();
		return totalpendings;
		
	}
	
	public Long getByApprovedCount() {

		List<VerificationRequest> verificationRequests = verificationRequestRepository.findAll();
		long totalApproves = verificationRequests.stream().filter(v -> v.getStatus().toString() == "APPROVED").count();
		return totalApproves;

	}
	
	public Long getByCancelledCount() {

		List<VerificationRequest> verificationRequests = verificationRequestRepository.findAll();
		long totalcancels = verificationRequests.stream().filter(v -> v.getStatus().toString() == "CANCELLED").count();
		return totalcancels;

	}

	

}
