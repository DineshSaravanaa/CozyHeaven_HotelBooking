package com.hotelbooking.cozyheaven.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.repository.HotelRepository;

@Service
public class HotelService {
	@Autowired
	private HotelRepository hotelRepository;

	// To Save Hotel in DB

	public Hotel addHotel(Hotel hotel) {

		return hotelRepository.save(hotel);
	}

	// Get All Hotels With Owner Id

	public List<Hotel> getHotelByOwnerID(int hotelownerID) {

		return hotelRepository.findByHotelOwnerId(hotelownerID);
	}

	// Get Hotel By Id

	public Hotel findByHotelID(int hotelID) throws InvalidIDException {
		Optional<Hotel> optional = hotelRepository.findById(hotelID);
		if (optional.isEmpty())
			throw new InvalidIDException("Hotel  ID Does Not Exist!");
		return optional.get();
	}

	// To Get Pending Requests Of Hotel Verification

	public List<Hotel> getPendingRequests() {

		return hotelRepository.findByStatus(HotelStatus.PENDING);
	}

	// To Get Deletion Requested Hotel

	public List<Hotel> getDeletionRequests() {

		return hotelRepository.findByDeletionRequested(DeletionRequest.Yes);
	}

	public Hotel uploadImage(int hId, MultipartFile file) throws InvalidIDException, IOException {

		Hotel hotel = hotelRepository.findById(hId).orElseThrow(() -> new InvalidIDException("Hotel Does Not Exist!"));
		List<String> allowedExtensions = Arrays.asList("jpg", "jpeg", "img", "svg", "gif", "avif");
		String originalFileName = file.getOriginalFilename();
		String extension = originalFileName.split("\\.")[1];
		if (!(allowedExtensions.contains(extension)))
			throw new RuntimeException("Please Upload Valid File Format");
		String uploadPath = "D:\\React\\owner-ui\\public";
		Files.createDirectories(Paths.get(uploadPath));
		Path path = Paths.get(uploadPath + "\\" + originalFileName);
		Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
		hotel.setImageUrls(path.toString());
		return hotelRepository.save(hotel);
	}

}
