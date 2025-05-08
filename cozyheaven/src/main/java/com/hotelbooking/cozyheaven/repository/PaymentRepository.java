package com.hotelbooking.cozyheaven.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>  {

	Optional<Payment> findByBookingId(int bookingId);

	List<Payment> findByPaymentDate(LocalDateTime paymentdate);

	List<Payment> findByBookingRoomHotelId(int hotelid);

//	Optional<Payment> findByCustomer_Id(int customerId);


	

}
