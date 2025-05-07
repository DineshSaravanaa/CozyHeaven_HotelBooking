package com.hotelbooking.cozyheaven.controller;

import com.hotelbooking.cozyheaven.enums.BookingStatus;
import com.hotelbooking.cozyheaven.enums.PaymentMethod;
import com.hotelbooking.cozyheaven.enums.PaymentStatus;
import com.hotelbooking.cozyheaven.model.*;
import com.hotelbooking.cozyheaven.repository.ReviewRepository;
import com.hotelbooking.cozyheaven.service.BookingService;
import com.hotelbooking.cozyheaven.service.HotelService;
import com.hotelbooking.cozyheaven.service.PaymentService;
import com.hotelbooking.cozyheaven.service.ReportService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
// Optional: If using MockMvc for testing HTTP aspects
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class ReportControllerTest {

    @Mock
    private BookingService bookingService;

    @Mock
    private PaymentService paymentService;

    @Mock
    private HotelService hotelService;

    @Mock
    private ReportService reportService;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReportController reportController;

    // Optional: For more integrated controller testing (uncomment if needed)
    // private MockMvc mockMvc;

    private Booking booking1;
    private Booking booking2;
    private Payment payment1;
    private Payment payment2;
    private Hotel hotel1;
    private Review review1;
    private Review review2;
    private Review review3;

    @BeforeEach
    void setUp() {
        // Optional: For more integrated controller testing
        // mockMvc = MockMvcBuilders.standaloneSetup(reportController).build();

        Customer customer = new Customer();
        customer.setId(1);

        Room room = new Room();
        room.setId(1);

        hotel1 = new Hotel();
        hotel1.setId(1);
        hotel1.setName("Cozy Heaven Downtown");
        hotel1.setCity("TestCity");

        room.setHotel(hotel1);


        booking1 = new Booking();
        booking1.setId(1);
        booking1.setCheckIn(LocalDate.now());
        booking1.setCheckOut(LocalDate.now().plusDays(2));
        booking1.setCapacity(2);
        booking1.setToatlAmount(200.00);
        booking1.setStatus(BookingStatus.CONFIRMED);
        booking1.setBookedAt(LocalDateTime.now().minusDays(5));
        booking1.setCustomer(customer);
        booking1.setRoom(room);

        booking2 = new Booking();
        booking2.setId(2);
        booking2.setCheckIn(LocalDate.now().plusDays(10));
        booking2.setCheckOut(LocalDate.now().plusDays(12));
        booking2.setCapacity(1);
        booking2.setToatlAmount(100.00);
        booking2.setStatus(BookingStatus.ON_PROCESS);
        booking2.setBookedAt(LocalDateTime.now().minusDays(2));
        booking2.setCustomer(customer);
        booking2.setRoom(room);

        payment1 = new Payment();
        payment1.setId(1);
        payment1.setAmountPaid(200.00);
        payment1.setTotalAmount(200.00);
        payment1.setPaymentDate(LocalDateTime.now().minusDays(4));
        payment1.setPaymentMethod(PaymentMethod.CREDIT);
        payment1.setStatus(PaymentStatus.COMPLETED);
        payment1.setBooking(booking1);

        payment2 = new Payment();
        payment2.setId(2);
        payment2.setAmountPaid(50.00); // Partially paid
        payment2.setTotalAmount(100.00);
        payment2.setPaymentDate(LocalDateTime.now().minusDays(1));
        payment2.setPaymentMethod(PaymentMethod.DEBIT);
        payment2.setStatus(PaymentStatus.PENDING);
        payment2.setBooking(booking2);

        review1 = new Review();
        review1.setId(1);
        review1.setRating(5);
        review1.setComment("Excellent!");

        review2 = new Review();
        review2.setId(2);
        review2.setRating(4);
        review2.setComment("Very Good");
        
        review3 = new Review();
        review3.setId(3);
        review3.setRating(5);
        review3.setComment("Amazing!");
    }

    @Test
    void testGetAllBooking() {
        List<Booking> bookings = Arrays.asList(booking1, booking2);
        when(bookingService.getAllBooking()).thenReturn(bookings);

        List<Booking> result = reportController.getAllBooking();

        assertEquals(2, result.size());
        assertEquals(bookings, result);
        verify(bookingService, times(1)).getAllBooking();
    }

    @Test
    void testGetCountOfBooking() {
        long count = 2L;
        when(bookingService.getCountOfBooking()).thenReturn(count);

        long result = reportController.getCountOfBooking();

        assertEquals(count, result);
        verify(bookingService, times(1)).getCountOfBooking();
    }

    @Test
    void testGetListOfBookingByDate() {
        LocalDateTime testDate = LocalDateTime.now().minusDays(5);
        List<Booking> bookings = Collections.singletonList(booking1);
        when(bookingService.getListOfBookingByDate(testDate)).thenReturn(bookings);

        List<Booking> result = reportController.getListOfBookingByDate(testDate);

        assertEquals(1, result.size());
        assertEquals(booking1, result.get(0));
        verify(bookingService, times(1)).getListOfBookingByDate(testDate);
    }

    @Test
    void testGetListOfBookingByDateCount() {
        LocalDateTime testDate = LocalDateTime.now().minusDays(2);
        long count = 1L; // Assuming bookingService.getListOfBookingByDateCount returns the count directly
        when(bookingService.getListOfBookingByDateCount(testDate)).thenReturn(count);

        long result = reportController.getListOfBookingByDateCount(testDate);

        assertEquals(count, result);
        verify(bookingService, times(1)).getListOfBookingByDateCount(testDate);
    }

    @Test
    void testGetListOfPayment() {
        List<Payment> payments = Arrays.asList(payment1, payment2);
        when(paymentService.getListOfPayment()).thenReturn(payments);

        List<Payment> result = reportController.getListOfPayment();

        assertEquals(2, result.size());
        assertEquals(payments, result);
        verify(paymentService, times(1)).getListOfPayment();
    }

    @Test
    void testGetAmountWithListOfPayment() {
        Double totalAmount = 250.00;
        when(paymentService.getAmountWithListOfPayment()).thenReturn(totalAmount);

        Double result = reportController.getAmountWithListOfPayment();

        assertEquals(totalAmount, result, 0.001);
        verify(paymentService, times(1)).getAmountWithListOfPayment();
    }

    @Test
    void testGetListOfPaymentByDate() {
        LocalDateTime testDate = LocalDateTime.now().minusDays(4);
        List<Payment> payments = Collections.singletonList(payment1);
        when(paymentService.getListOfPaymentByDate(testDate)).thenReturn(payments);

        List<Payment> result = reportController.getListOfPaymentByDate(testDate);

        assertEquals(1, result.size());
        assertEquals(payment1, result.get(0));
        verify(paymentService, times(1)).getListOfPaymentByDate(testDate);
    }

    @Test
    void testGetAmountByCustomDate() {
        LocalDateTime testDate = LocalDateTime.now().minusDays(1);
        Double customAmount = 50.00;
        when(paymentService.getAmountByCustomDate(testDate)).thenReturn(customAmount);

        Double result = reportController.getAmountByCustomDate(testDate);

        assertEquals(customAmount, result, 0.001);
        verify(paymentService, times(1)).getAmountByCustomDate(testDate);
    }

    @Test
    void testGetBookingsByHotelLocation() {
        String location = "TestCity";
        List<Booking> bookings = Arrays.asList(booking1, booking2);
        when(bookingService.getBookingByPlace(location)).thenReturn(bookings);

        List<Booking> result = reportController.getBookingsByHotelLocation(location);

        assertEquals(2, result.size());
        assertEquals(bookings, result);
        verify(bookingService, times(1)).getBookingByPlace(location);
    }

    @Test
    void testGetAllHotelsUnderUs() {
        List<Hotel> hotels = Collections.singletonList(hotel1);
        when(hotelService.getAllHotelsUnderUs()).thenReturn(hotels);

        List<Hotel> result = reportController.getAllHotelsUnderUs();

        assertEquals(1, result.size());
        assertEquals(hotel1, result.get(0));
        verify(hotelService, times(1)).getAllHotelsUnderUs();
    }

    @Test
    void testGetTotalRevenueByHotelId() {
        int hotelId = 1;
        Double totalRevenue = 200.00; // Assuming payment1 is the only completed for hotel1
        when(paymentService.getTotalRevenueByHotelId(hotelId)).thenReturn(totalRevenue);

        Double result = reportController.getTotalRevenueByHotelId(hotelId);

        assertEquals(totalRevenue, result, 0.001);
        verify(paymentService, times(1)).getTotalRevenueByHotelId(hotelId);
    }

    @Test
    void testGetListofBookingByCustom() throws Exception {
        LocalDateTime fromDate = LocalDateTime.now().minusDays(10);
        LocalDateTime toDate = LocalDateTime.now();
        List<Booking> bookings = Arrays.asList(booking1, booking2);
        when(bookingService.getListofBookingByCustom(fromDate, toDate)).thenReturn(bookings);

        List<Booking> result = reportController.getListofBookingByCustom(fromDate, toDate);

        assertEquals(2, result.size());
        assertEquals(bookings, result);
        verify(bookingService, times(1)).getListofBookingByCustom(fromDate, toDate);
    }

    @Test
    void testGetAllAmountsForEachMonth() {
        double[] monthlyRevenue = {0, 0, 0, 0, 0, 150.0, 200.0, 0, 0, 0, 0, 0}; // Example
        when(reportService.calculateMonthlyRevenue()).thenReturn(monthlyRevenue);

        double[] result = reportController.getAllAmountsForEachMonth();

        assertArrayEquals(monthlyRevenue, result, 0.001);
        verify(reportService, times(1)).calculateMonthlyRevenue();
    }

    @Test
    void testGetAllBookingCountEachMonth() {
        double[] monthlyBookings = {0, 0, 1.0, 2.0, 0, 0, 0, 0, 0, 0, 0, 0}; // Example
        when(reportService.calculateMonthlyBookingCount()).thenReturn(monthlyBookings);

        double[] result = reportController.getAllBookingCountEachMonth();

        assertArrayEquals(monthlyBookings, result, 0.001);
        verify(reportService, times(1)).calculateMonthlyBookingCount();
    }

    @Test
    void testGetAllReviewsCount() {
        long count = 3L;
        when(reviewRepository.count()).thenReturn(count);

        double result = reportController.getAllReviews();

        assertEquals((double)count, result, 0.001);
        verify(reviewRepository, times(1)).count();
    }

    @Test
    void testGetRatingsCountForFrontend() {
        List<Review> reviews = Arrays.asList(review1, review2, review3); // review1 (5), review2 (4), review3 (5)
        when(reviewRepository.findAll()).thenReturn(reviews);

        double[] expectedCounts = {0.0, 0.0, 0.0, 1.0, 2.0}; // 1-star, 2-star, 3-star, 4-star (1), 5-star (2)
        double[] result = reportController.getRatingsCountForFrontend();

        assertArrayEquals(expectedCounts, result, 0.001);
        verify(reviewRepository, times(1)).findAll();
    }
    
    @Test
    void testGetRatingsCountForFrontend_EmptyList() {
        when(reviewRepository.findAll()).thenReturn(Collections.emptyList());

        double[] expectedCounts = {0.0, 0.0, 0.0, 0.0, 0.0};
        double[] result = reportController.getRatingsCountForFrontend();

        assertArrayEquals(expectedCounts, result, 0.001);
        verify(reviewRepository, times(1)).findAll();
    }

    @Test
    void testGetListOfReview() {
        List<Review> reviews = Arrays.asList(review1, review2);
        when(reviewRepository.findAll()).thenReturn(reviews);

        List<Review> result = reportController.getListOfReview();

        assertEquals(2, result.size());
        assertEquals(reviews, result);
        verify(reviewRepository, times(1)).findAll();
    }
}