package com.hotelbooking.cozyheaven.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.hotelbooking.cozyheaven.enums.RefundStatus;
import com.hotelbooking.cozyheaven.enums.Status;
import com.hotelbooking.cozyheaven.model.CancellationRequest;
import com.hotelbooking.cozyheaven.model.Refund;
import com.hotelbooking.cozyheaven.repository.RefundRepository;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class RefundServiceTest {

	@InjectMocks
	private RefundService refundService;

	@Mock
	private RefundRepository refundRepository;

	Refund r1;
	Refund r2;

	@BeforeEach
	public void init() {
		Refund r1 = new Refund(101, 1500.00, "Trip cancellation due to weather", RefundStatus.INITIATED,
				LocalDateTime.of(2025, 5, 5, 10, 0), new CancellationRequest(1, LocalDateTime.of(2025, 4, 10, 14, 30),
						"Personal reasons", "Unable to travel due to family emergency.", Status.REQUESTED, null, null));

		Refund r2 = new Refund(102, 1000.00, "Customer changed travel plans", RefundStatus.SUCCESS,
				LocalDateTime.of(2025, 5, 6, 14, 30),
				new CancellationRequest(2, LocalDateTime.of(2025, 4, 12, 9, 15), "Change of plans",
						"Rescheduling travel.", Status.APPROVED, LocalDateTime.of(2025, 4, 13, 10, 0), null));

	}

	@Test
	public void postRefund() {
		when(refundRepository.save(r1)).thenReturn(r1);
		assertEquals(r1, refundService.postRefund(r1));
		verify(refundRepository, times(1)).save(r1);
	}

}
