
package com.hotelbooking.cozyheaven.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotelbooking.cozyheaven.enums.GovernmentIDType;
import com.hotelbooking.cozyheaven.enums.IsVerified;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.HotelOwner;
import com.hotelbooking.cozyheaven.model.User;
import com.hotelbooking.cozyheaven.repository.HotelOwnerRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class HotelOwnerServiceTest {
	@InjectMocks
	private HotelOwnerService hotelOwnerService;
	@Mock
	private HotelOwnerRepository hotelOwnerRepository;

	HotelOwner owner1;
	HotelOwner owner2;
	HotelOwner owner22;

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
		owner22 = new HotelOwner(1, "Owner Two", "owner2@example.com", "9876543210", "123 Main Street, Delhi",
				GovernmentIDType.AadharCard, "AADHAAR123456", "BRN001", "GSTIN001", "BANK001", IsVerified.NotVerified,
				LocalDateTime.now().minusDays(20),
				new User(2, "owner2", "owner2user@example.com", "pass2", "HotelOwner"));
	}

	@Test
	public void addHotelOwner() {
		when(hotelOwnerRepository.save(owner2)).thenReturn(owner22);
		assertEquals(owner22, hotelOwnerService.addHotelOwner(owner2));
	}

	@Test
	public void getOwnerByID() {
		when(hotelOwnerRepository.findById(owner1.getId())).thenReturn(Optional.of(owner1));

		// UseCase 1 : Valid Id
		try {
			assertEquals(owner1, hotelOwnerService.getOwnerByID(1));
		} catch (InvalidIDException e) {
			assertEquals("Hotel Owner ID Does Not Exist!", e.getMessage());
		}

		// UseCase 2 : InValid Id
		when(hotelOwnerRepository.findById(2)).thenReturn(Optional.empty());
		try {
			assertEquals(owner1, hotelOwnerService.getOwnerByID(2));
		} catch (InvalidIDException e) {
			assertEquals("Hotel Owner ID Does Not Exist!", e.getMessage());
		}
	}
}
