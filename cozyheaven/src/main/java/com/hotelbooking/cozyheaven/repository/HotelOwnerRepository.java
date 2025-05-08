package com.hotelbooking.cozyheaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.HotelOwner;

public interface HotelOwnerRepository extends JpaRepository<HotelOwner, Integer> {

	HotelOwner findByUserUsername(String name);

}
