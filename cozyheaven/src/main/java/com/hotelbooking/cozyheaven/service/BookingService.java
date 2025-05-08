package com.hotelbooking.cozyheaven.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.hotelbooking.cozyheaven.controller.BookingController;
import com.hotelbooking.cozyheaven.enums.BookingStatus;
import com.hotelbooking.cozyheaven.exception.BookingNotFoundException;
import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.Booking;
import com.hotelbooking.cozyheaven.repository.BookingRepository;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	public Booking createBooking(Booking booking) {
		// TODO Auto-generated method stub
		return bookingRepository.save(booking);
	}

	public Booking getBookingById(int bookingId) throws InvalidIDException {
		// TODO Auto-generated method stub
		Optional<Booking> optional = bookingRepository.findById(bookingId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("booking ID is invalid...");
		}
		return optional.get();
	}

	public Booking getBookingsByCustomer(int userId) throws InvalidIDException {
		// TODO Auto-generated method stub
		Optional<Booking> optional = bookingRepository.findByCustomerId(userId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("customer ID is invalid...");
		}
		return optional.get();
	}

	public Booking getBookingsByRoom(int roomId) throws InvalidIDException {
		// TODO Auto-generated method stub
		Optional<Booking> optional = bookingRepository.findByRoomId(roomId);
		if (optional.isEmpty()) {
			throw new InvalidIDException("room ID is invalid...");
		}
		return optional.get();
	}

	 public Booking cancelBooking(int bookingId) {
	        // Retrieve the booking
	        Booking booking = bookingRepository.findById(bookingId)
	                .orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + bookingId));

	        // Set the status to CANCELLED
	        booking.setStatus(BookingStatus.CANCELLED);

	        // Save the updated booking
	        return bookingRepository.save(booking);
	    }

	public List<Booking> getAllBooking() {
		// TODO Auto-generated method stub
		return bookingRepository.findAll();
	}

	// created By Dinesh
	public List<Booking> getBookingByHotelID(int hotelid) {

		List<Booking> bookings = bookingRepository.findByRoomHotelId(hotelid);
		return bookings;
	}


	public Page<Booking> getBookingByOwner(int ownerid ,Pageable pageable) {
		
		return bookingRepository.findByRoomHotelHotelOwnerId(ownerid,pageable);

	public List<Booking> getBookingByOwner(int ownerid) {

		return bookingRepository.findByRoomHotelHotelOwnerId(ownerid);

	}

	public List<Booking> getBookingByPlace(String location) {
		return bookingRepository.findByRoomHotelCity(location);
	}

	public long getCountOfBooking() {
		return bookingRepository.count();
	}

	public List<Booking> getListOfBookingByDate(LocalDateTime bookdate) {
		return bookingRepository.findByBookedAt(bookdate);
	}

	public long getListOfBookingByDateCount(LocalDateTime bookdate) {
		List<Booking> book = bookingRepository.findByBookedAt(bookdate);
		return book.size();
	}

	public List<Booking> getListofBookingByCustom(LocalDateTime fromdate, LocalDateTime todate)
			throws BookingNotFoundException {
		List<Booking> bookings = bookingRepository.findByBookedAtBetween(fromdate, todate);
		if (bookings.isEmpty())
			throw new BookingNotFoundException("No Records Found between these dates");

		return bookings;
	}

	public List<Booking> getAll() {

		return bookingRepository.findAll();
	}

	public Booking confirmBooking(int bookingId) {
		// Retrieve the booking from the repository
		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + bookingId));

		// Update the booking status to CONFIRMED
		booking.setStatus(BookingStatus.CONFIRMED);

		// Save and return the updated booking
		return bookingRepository.save(booking);
	}

	public List<Booking> getAllBookingByOwner(int id) {
		
		return bookingRepository.findByRoomHotelHotelOwnerId(id);
	}

}
