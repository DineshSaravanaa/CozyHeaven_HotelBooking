package com.hotelbooking.cozyheaven.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	private Booking Booking;
	/*
	 * 1. list of bookings
	 * 2. count(list of bookings)
	 * 3. filter by date of booking (list of booking or count)
	 * 4. total amount (revenue) by date
	 * 
	 * */


}
