package com.hotelbooking.cozyheaven.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

import com.hotelbooking.cozyheaven.enums.Status;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.model.CancellationRequest;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.Room;
import com.hotelbooking.cozyheaven.repository.CancellationRequestRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class CancellationRequestServiceTest {
	@InjectMocks
	private CancellationRequestService cancellationRequestService;
	@Mock
	private CancellationRequestRepository cancellationRequestRepository;
	CancellationRequest c1;
	CancellationRequest c2;
	CancellationRequest c22;

	Booking b1 = new Booking();
	Booking b2 = new Booking();

	Hotel h1 = new Hotel();
	Room r1 = new Room();

	@BeforeEach
	public void init() {

		c1 = new CancellationRequest(1, LocalDateTime.of(2025, 4, 10, 14, 30), "Personal reasons",
				"Unable to travel due to family emergency.", Status.REQUESTED, null, // Not yet processed
				b1);

		c2 = new CancellationRequest(2, LocalDateTime.of(2025, 4, 12, 9, 15), "Change of plans",
				"The travel dates have been rescheduled.", Status.APPROVED, LocalDateTime.of(2025, 4, 13, 10, 0), b2);

		c22 = new CancellationRequest(2, LocalDateTime.of(2025, 4, 12, 9, 15), "Change of plans",
				"The travel dates have been rescheduled.", Status.APPROVED, LocalDateTime.of(2025, 4, 13, 10, 0), b2);
		h1.setId(1);
		r1.setHotel(h1);
		b1.setRoom(r1);
		b2.setRoom(r1);
	}

	@Test
	public void cancellBooking() {
		when(cancellationRequestRepository.save(c2)).thenReturn(c22);
		assertEquals(c22, cancellationRequestService.cancellBooking(c2));
	}

	@Test
	public void findByID() {
		// UseCase : 1 Valid Id
		when(cancellationRequestRepository.findById(c1.getId())).thenReturn(Optional.of(c1));
		try {
			assertEquals(c1, cancellationRequestService.findByID(1));
		} catch (InvalidIDException e) {

			assertEquals("Cancellation ID Does Not Exist!", e.getMessage());
		}

		// UseCase : 1 InValid Id
		when(cancellationRequestRepository.findById(2)).thenReturn(Optional.empty());
		try {
			assertEquals(c1, cancellationRequestService.findByID(2));
		} catch (InvalidIDException e) {

			assertEquals("Cancellation ID Does Not Exist!", e.getMessage());
		}
	}

	@Test
	public void getByHotel() {
		// assuming c1 and c2 are request for same hotel with id1
		List<CancellationRequest> request = Arrays.asList(c1, c2);
		when(cancellationRequestRepository.findByBookingRoomHotelId(b1.getRoom().getHotel().getId()))
				.thenReturn(request);
		assertEquals(request, cancellationRequestService.getByHotel(1));
	}

}
