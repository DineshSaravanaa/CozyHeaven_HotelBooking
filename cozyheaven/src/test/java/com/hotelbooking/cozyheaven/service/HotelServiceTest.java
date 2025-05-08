package com.hotelbooking.cozyheaven.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.GovernmentIDType;
import com.hotelbooking.cozyheaven.enums.HotelAvailability;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.enums.HotelType;
import com.hotelbooking.cozyheaven.enums.IsVerified;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.repository.HotelRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class HotelServiceTest {

	@InjectMocks
	private HotelService hotelService;
	@Mock
	private HotelRepository hotelRepository;

	Hotel h1;
	Hotel h2;
	Hotel h3;
	Hotel h33;
	HotelOwner owner1;
	HotelOwner owner2;

	@BeforeEach
	public void init() {
		owner1 = new HotelOwner(1, "Owner One", "owner1@example.com", "9876543210", "123 Main Street, Delhi",
				GovernmentIDType.AadharCard, "AADHAAR123456", "BRN001", "GSTIN001", "BANK001", IsVerified.Verified,
				LocalDateTime.now().minusDays(20),
				new User(1, "owner1", "owner1user@example.com", "pass1", "HotelOwner"));

		owner2 = new HotelOwner(1, "Owner Two", "owner2@example.com", "9876543210", "123 Main Street, Delhi",
				GovernmentIDType.AadharCard, "AADHAAR123456", "BRN001", "GSTIN001", "BANK001", IsVerified.NotVerified,
				LocalDateTime.now().minusDays(20),
				new User(2, "owner2", "owner2user@example.com", "pass2", "HotelOwner"));

		h1 = new Hotel(1, "Hotel Sunshine", HotelType.BUDGET, "Beachside resort", "123 Beach Road", "Goa", "Goa",
				"403001", "India", "contact@sunshine.com", "9876543210", "sunshine.jpg", HotelStatus.APPROVED,
				HotelAvailability.YES, "Pool, Spa, Gym", "LIC12345", "PROP56789", 4.5,
				LocalDateTime.now().minusDays(10), LocalDateTime.now().minusDays(5), DeletionRequest.Yes, owner1);

		h2 = new Hotel(2, "Mountain View", HotelType.HOSTEL, "Hilltop hotel", "456 Hill Street", "Manali",
				"Himachal Pradesh", "175131", "India", "contact@mountainview.com", "9876543211", "mountain.jpg",
				HotelStatus.PENDING, HotelAvailability.YES, "WiFi, Breakfast", "LIC54321", "PROP12345", 3.8,
				LocalDateTime.now().minusDays(20), null, DeletionRequest.No, owner2);

		h3 = new Hotel(3, "City Inn", HotelType.LUXURY, "Affordable city lodge", "789 Market Road", "Mumbai",
				"Maharashtra", "400001", "India", "contact@cityinn.com", "9876543212", "cityinn.jpg",
				HotelStatus.PENDING, HotelAvailability.YES, "AC, TV", "LIC99887", "PROP55667", 2.5,
				LocalDateTime.now().minusDays(30), null, DeletionRequest.Yes, owner1);
		h33 = new Hotel(3, "City Inn", HotelType.LUXURY, "Affordable city lodge", "789 Market Road", "Mumbai",
				"Maharashtra", "400001", "India", "contact@cityinn.com", "9876543212", "cityinn.jpg",
				HotelStatus.APPROVED, HotelAvailability.YES, "AC, TV", "LIC99887", "PROP55667", 2.5,
				LocalDateTime.now().minusDays(30), null, DeletionRequest.Yes, owner1);

	}

	@Test
	public void addHotel() {
		when(hotelRepository.save(h3)).thenReturn(h33);
		assertEquals(h33, hotelService.addHotel(h3));
		verify(hotelRepository, times(1)).save(h3);
	}

	@Test
	public void getHotelByOwner() {
		List<Hotel> hotels = Arrays.asList(h1, h3, h33);
		when(hotelRepository.findByHotelOwnerId(owner1.getId())).thenReturn(hotels);
		assertEquals(hotels, hotelService.getHotelByOwnerID(1));
	}

	@Test
	public void getHotelByID() {
		// UseCase 1 : Valid ID
		when(hotelRepository.findById(h1.getId())).thenReturn(Optional.of(h1));
		try {
			assertEquals(h1, hotelService.findByHotelID(1));
		} catch (InvalidIDException e) {
			assertEquals("Hotel  ID Does Not Exist!", e.getMessage());
		}

		// UseCase 2: Invalid ID

		when(hotelRepository.findById(2)).thenReturn(Optional.empty());
		try {
			assertEquals(h1, hotelService.findByHotelID(2));
		} catch (InvalidIDException e) {
			assertEquals("Hotel  ID Does Not Exist!", e.getMessage());
		}
	}

	@Test
	public void getPendingRequests() {
		List<Hotel> hotel = Arrays.asList(h2, h3);
		when(hotelRepository.findByStatus(HotelStatus.PENDING)).thenReturn(hotel);
		assertEquals(hotel, hotelService.getPendingRequests());
	}

	@Test
	public void getDeletionRequests() {
		List<Hotel> hotels = Arrays.asList(h1, h3, h33);
		when(hotelRepository.findByDeletionRequested(DeletionRequest.Yes)).thenReturn(hotels);
		assertEquals(hotels, hotelService.getDeletionRequests());
	}

}
