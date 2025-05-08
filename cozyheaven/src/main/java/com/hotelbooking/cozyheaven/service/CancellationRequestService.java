package com.hotelbooking.cozyheaven.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.CancellationRequest;
import com.hotelbooking.cozyheaven.repository.CancellationRequestRepository;

@Service
public class CancellationRequestService {
	@Autowired
	private CancellationRequestRepository cancellationRequestRepository;

	// To Save Requests in DB

	public CancellationRequest cancellBooking(CancellationRequest cancellationRequest) {

		return cancellationRequestRepository.save(cancellationRequest);
	}

	// To Get Request By ID

	public CancellationRequest findByID(int id) throws InvalidIDException {
		Optional<CancellationRequest> optional = cancellationRequestRepository.findById(id);
		if (optional.isEmpty())
			throw new InvalidIDException("Cancellation ID Does Not Exist!");
		return optional.get();
	}

	// To Get Request By Hotel Id

	public List<CancellationRequest> getByHotel(int hotelid) {

		return cancellationRequestRepository.findByBookingRoomHotelId(hotelid);
	}

	// To Get Requests By Owner Id (Pagination)

	public Page<CancellationRequest> getByHotelOwner(int id, Pageable pageable) {

		return cancellationRequestRepository.findByBookingRoomHotelHotelOwnerId(id, pageable);
	}

	// To Get Requests By Owner Id

	public List<CancellationRequest> getAllByOwner(int id) {

		return cancellationRequestRepository.findByBookingRoomHotelHotelOwnerId(id);
	}

}
