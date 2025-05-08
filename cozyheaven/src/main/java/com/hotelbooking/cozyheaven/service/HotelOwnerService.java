package com.hotelbooking.cozyheaven.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.repository.HotelOwnerRepository;

@Service
public class HotelOwnerService {
	@Autowired
	private HotelOwnerRepository hotelOwnerRepository;

	// Saving HotelOwner In DB

	public HotelOwner addHotelOwner(HotelOwner hotelOwner) {

		return hotelOwnerRepository.save(hotelOwner);
	}

	// To Get Owner By ID

	public HotelOwner getOwnerByID(int id) throws InvalidIDException {

		Optional<HotelOwner> optional = hotelOwnerRepository.findById(id);
		if (optional.isEmpty())
			throw new InvalidIDException("Hotel Owner ID Does Not Exist!");
		return optional.get();
	}

	// To Get Owner By Username

	public HotelOwner getOwnerByUsername(String name) {

		return hotelOwnerRepository.findByUserUsername(name);
	}

}
