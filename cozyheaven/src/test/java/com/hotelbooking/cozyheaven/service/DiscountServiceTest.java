package com.hotelbooking.cozyheaven.service;

import com.hotelbooking.cozyheaven.model.Discount;
import com.hotelbooking.cozyheaven.model.Hotel;
import com.hotelbooking.cozyheaven.model.Season;
import com.hotelbooking.cozyheaven.repository.DiscountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DiscountServiceTest {

    @Mock
    private DiscountRepository discountRepository;

    @InjectMocks
    private DiscountService discountService;

    private Discount discount1;
    private Discount discount2;
    private Hotel hotel1;
    private Season season1;

    @BeforeEach
    void setUp() {
        hotel1 = new Hotel();
        hotel1.setId(1);
        hotel1.setName("Grand Cozy Hotel");

        season1 = new Season();
        season1.setId(1);
        season1.setName("Summer");

        discount1 = new Discount();
        discount1.setId(1);
        discount1.setCoupon("SUMMER10");
        discount1.setDescription("10% off for summer");
        discount1.setPercentage(10);
        discount1.setValidFromm(LocalDate.of(2024, 6, 1)); // Note: validFromm typo from model
        discount1.setValidTo(LocalDate.of(2024, 8, 31));
        discount1.setHotel(hotel1);
        discount1.setSeason(season1);

        discount2 = new Discount();
        discount2.setId(2);
        discount2.setCoupon("WINTER20");
        discount2.setDescription("20% off for winter");
        discount2.setPercentage(20);
        discount2.setValidFromm(LocalDate.of(2024, 12, 1));
        discount2.setValidTo(LocalDate.of(2025, 2, 28));
        // Assuming discount2 might be for a different hotel/season or no specific one for some tests
    }

    @Test
    void testAddDiscount() {
        // Arrange
        when(discountRepository.save(any(Discount.class))).thenReturn(discount1);

        // Act
        Discount savedDiscount = discountService.addDiscount(discount1);

        // Assert
        assertNotNull(savedDiscount);
        assertEquals(discount1.getCoupon(), savedDiscount.getCoupon());
        assertEquals(discount1.getPercentage(), savedDiscount.getPercentage());
        verify(discountRepository, times(1)).save(discount1);
    }

    @Test
    void testGetDisountByHotelId_Success() {
        // Arrange
        int hotelId = 1;
        List<Discount> expectedDiscounts = Arrays.asList(discount1);
        when(discountRepository.findByHotelId(hotelId)).thenReturn(expectedDiscounts);

        // Act
        List<Discount> actualDiscounts = discountService.getDisountByHotelId(hotelId);

        // Assert
        assertNotNull(actualDiscounts);
        assertEquals(1, actualDiscounts.size());
        assertEquals(expectedDiscounts, actualDiscounts);
        verify(discountRepository, times(1)).findByHotelId(hotelId);
    }

    @Test
    void testGetDisountByHotelId_NotFound() {
        // Arrange
        int hotelId = 99; // Non-existent hotel ID
        when(discountRepository.findByHotelId(hotelId)).thenReturn(Collections.emptyList());

        // Act
        List<Discount> actualDiscounts = discountService.getDisountByHotelId(hotelId);

        // Assert
        assertNotNull(actualDiscounts);
        assertTrue(actualDiscounts.isEmpty());
        verify(discountRepository, times(1)).findByHotelId(hotelId);
    }

    @Test
    void testGetDisountBySeasonId_Success() {
        // Arrange
        int seasonId = 1;
        List<Discount> expectedDiscounts = Arrays.asList(discount1);
        when(discountRepository.findBySeasonId(seasonId)).thenReturn(expectedDiscounts);

        // Act
        List<Discount> actualDiscounts = discountService.getDisountBySeasonId(seasonId);

        // Assert
        assertNotNull(actualDiscounts);
        assertEquals(1, actualDiscounts.size());
        assertEquals(expectedDiscounts, actualDiscounts);
        verify(discountRepository, times(1)).findBySeasonId(seasonId);
    }

    @Test
    void testGetDisountBySeasonId_NotFound() {
        // Arrange
        int seasonId = 99; // Non-existent season ID
        when(discountRepository.findBySeasonId(seasonId)).thenReturn(Collections.emptyList());

        // Act
        List<Discount> actualDiscounts = discountService.getDisountBySeasonId(seasonId);

        // Assert
        assertNotNull(actualDiscounts);
        assertTrue(actualDiscounts.isEmpty());
        verify(discountRepository, times(1)).findBySeasonId(seasonId);
    }

    @Test
    void testGetAllDiscount_Success() {
        // Arrange
        List<Discount> expectedDiscounts = Arrays.asList(discount1, discount2);
        when(discountRepository.findAll()).thenReturn(expectedDiscounts);

        // Act
        List<Discount> actualDiscounts = discountService.getAllDiscount();

        // Assert
        assertNotNull(actualDiscounts);
        assertEquals(2, actualDiscounts.size());
        assertEquals(expectedDiscounts, actualDiscounts);
        verify(discountRepository, times(1)).findAll();
    }

    @Test
    void testGetAllDiscount_NoDiscounts() {
        // Arrange
        when(discountRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        List<Discount> actualDiscounts = discountService.getAllDiscount();

        // Assert
        assertNotNull(actualDiscounts);
        assertTrue(actualDiscounts.isEmpty());
        verify(discountRepository, times(1)).findAll();
    }

    @Test
    void testGetHotelByDiscountName_Success() {
        // Arrange
        String discountCoupon = "SUMMER10";
        Hotel hotel2 = new Hotel();
        hotel2.setId(2);
        hotel2.setName("BeachSide Resort");

        // Simulate that discountRepository.findHotelByCoupon returns a list of Hotel entities
        // associated with the coupon.
        List<Hotel> hotelsWithCoupon = Arrays.asList(hotel1, hotel2);
        when(discountRepository.findHotelByCoupon(discountCoupon)).thenReturn(hotelsWithCoupon);

        // Act
        List<String> hotelNames = discountService.getHotelByDiscountName(discountCoupon);

        // Assert
        assertNotNull(hotelNames);
        assertEquals(2, hotelNames.size());
        assertTrue(hotelNames.contains("Grand Cozy Hotel"));
        assertTrue(hotelNames.contains("BeachSide Resort"));
        verify(discountRepository, times(1)).findHotelByCoupon(discountCoupon);
    }

    @Test
    void testGetHotelByDiscountName_NoHotelsFound() {
        // Arrange
        String discountCoupon = "UNKNOWN_COUPON";
        when(discountRepository.findHotelByCoupon(discountCoupon)).thenReturn(Collections.emptyList());

        // Act
        List<String> hotelNames = discountService.getHotelByDiscountName(discountCoupon);

        // Assert
        assertNotNull(hotelNames);
        assertTrue(hotelNames.isEmpty());
        verify(discountRepository, times(1)).findHotelByCoupon(discountCoupon);
    }

     @Test
    void testGetHotelByDiscountName_HotelWithNullName() {
        // Arrange
        String discountCoupon = "NULL_NAME_COUPON";
        Hotel hotelWithNullName = new Hotel(); // Name is null by default
        hotelWithNullName.setId(3);

        List<Hotel> hotelsWithCoupon = Arrays.asList(hotel1, hotelWithNullName);
        when(discountRepository.findHotelByCoupon(discountCoupon)).thenReturn(hotelsWithCoupon);

        // Act
        List<String> hotelNames = discountService.getHotelByDiscountName(discountCoupon);

        // Assert
        assertNotNull(hotelNames);
        assertEquals(2, hotelNames.size());
        assertTrue(hotelNames.contains("Grand Cozy Hotel"));
        assertTrue(hotelNames.contains(null)); // The stream().map(h->h.getName()) will produce null
        verify(discountRepository, times(1)).findHotelByCoupon(discountCoupon);
    }
}
