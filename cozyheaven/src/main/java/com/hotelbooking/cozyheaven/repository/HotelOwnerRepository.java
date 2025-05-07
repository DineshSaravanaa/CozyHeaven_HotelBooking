package com.hotelbooking.cozyheaven.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.HotelOwner;

public interface HotelOwnerRepository extends JpaRepository<HotelOwner, Integer>  {

	HotelOwner findByUserUsername(String name);
	
	Optional<HotelOwner> findById(Long ownerId);

}
