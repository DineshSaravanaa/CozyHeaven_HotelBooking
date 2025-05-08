package com.hotelbooking.cozyheaven.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

	Optional<Booking> findByCustomerId(int userId);

	Optional<Booking> findByRoomId(int roomId);
	
	List<Booking> findByRoomHotelId(int hotelid);
	
	Page<Booking> findByRoomHotelHotelOwnerId(int ownerid,Pageable pageable);

	List<Booking> findByRoomHotelHotelOwnerId(int id);

}
