package com.hotelbooking.cozyheaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

	List<Hotel> findByHotelOwnerId(int hotelOwnerId);

	List<Hotel> findByStatus(HotelStatus status);

	List<Hotel> findByDeletionRequested(DeletionRequest request);

}
