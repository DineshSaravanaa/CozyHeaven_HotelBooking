package com.hotelbooking.cozyheaven.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.hotelbooking.cozyheaven.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CancellationRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private LocalDateTime requestDate;

	@Column(nullable = false)
	private String reason;

	@Column(nullable = false)
	private String details;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status;
	
	private LocalDateTime processedAt;

	@ManyToOne
	private Booking booking;
	
	
	

	public CancellationRequest() {
		super();
	}

	
	public CancellationRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CancellationRequest(int id, LocalDateTime requestDate, String reason, String details, Status status,
			LocalDateTime processedAt, Booking booking) {
		super();
		this.id = id;
		this.requestDate = requestDate;
		this.reason = reason;
		this.details = details;
		this.status = status;
		this.processedAt = processedAt;
		this.booking = booking;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDateTime getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(LocalDateTime requestDate) {
		this.requestDate = requestDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public LocalDateTime getProcessedAt() {
		return processedAt;
	}

	public void setProcessedAt(LocalDateTime processedAt) {
		this.processedAt = processedAt;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	@Override
	public int hashCode() {
		return Objects.hash(booking, details, id, processedAt, reason, requestDate, status);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CancellationRequest other = (CancellationRequest) obj;
		return Objects.equals(booking, other.booking) && Objects.equals(details, other.details) && id == other.id
				&& Objects.equals(processedAt, other.processedAt) && Objects.equals(reason, other.reason)
				&& Objects.equals(requestDate, other.requestDate) && status == other.status;
	}
	

}
