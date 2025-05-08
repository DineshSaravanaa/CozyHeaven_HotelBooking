package com.hotelbooking.cozyheaven.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.CancellationRequest;

public interface CancellationRequestRepository extends JpaRepository<CancellationRequest, Integer> {

	List<CancellationRequest> findByBookingRoomHotelId(int hotelid);

	List<CancellationRequest> findByBookingRoomHotelHotelOwnerId(int id);

	Page<CancellationRequest> findByBookingRoomHotelHotelOwnerId(int id, Pageable pageable);

}
