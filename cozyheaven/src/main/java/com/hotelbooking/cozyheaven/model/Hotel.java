package com.hotelbooking.cozyheaven.model;

import java.time.LocalDateTime;
import java.util.Objects;

import com.hotelbooking.cozyheaven.enums.DeletionRequest;
import com.hotelbooking.cozyheaven.enums.HotelAvailability;
import com.hotelbooking.cozyheaven.enums.HotelStatus;
import com.hotelbooking.cozyheaven.enums.HotelType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Hotel {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(nullable = false)
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private HotelType type;

	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private String address;

	@Column(nullable = false)
	private String city;

	@Column(nullable = false)
	private String state;

	@Column(nullable = false)
	private String zip;

	@Column(nullable = false)
	private String country;

	@Column(nullable = false)
	private String contactEmail;

	@Column(nullable = false)
	private String contact;

	@Column(nullable = false)
	private String imageUrls;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private HotelStatus status;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private HotelAvailability isAvailable;

	@Column(nullable = false)
	private String commonAmenities;

	@Column(nullable = false)
	private String licenseDetails;

	@Column(nullable = false)
	private String propertyProofDetails;

	@Column(nullable = false)
	private Double starRating;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	
	private LocalDateTime approvedAt;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DeletionRequest deletionRequested;
	
	private String deletionReason;

	// relationship
	@ManyToOne
	private HotelOwner hotelOwner;
	
	

	

	

	public Hotel(int id, String name, HotelType type, String description, String address, String city, String state,
			String zip, String country, String contactEmail, String contact, String imageUrls, HotelStatus status,
			HotelAvailability isAvailable, String commonAmenities, String licenseDetails, String propertyProofDetails,
			Double starRating, LocalDateTime createdAt, LocalDateTime approvedAt, DeletionRequest deletionRequested,
			HotelOwner hotelOwner) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.description = description;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.contactEmail = contactEmail;
		this.contact = contact;
		this.imageUrls = imageUrls;
		this.status = status;
		this.isAvailable = isAvailable;
		this.commonAmenities = commonAmenities;
		this.licenseDetails = licenseDetails;
		this.propertyProofDetails = propertyProofDetails;
		this.starRating = starRating;
		this.createdAt = createdAt;
		this.approvedAt = approvedAt;
		this.deletionRequested = deletionRequested;
		this.hotelOwner = hotelOwner;
	}

	public Hotel() {
		// TODO Auto-generated constructor stub
	}

	public HotelOwner getHotelOwner() {
		return hotelOwner;
	}

	public void setHotelOwner(HotelOwner hotelOwner) {
		this.hotelOwner = hotelOwner;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	

	public String getDeletionReason() {
		return deletionReason;
	}

	public void setDeletionReason(String deletionReason) {
		this.deletionReason = deletionReason;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getImageUrls() {
		return imageUrls;
	}

	public void setImageUrls(String imageUrls) {
		this.imageUrls = imageUrls;
	}

	public String getCommonAmenities() {
		return commonAmenities;
	}

	public void setCommonAmenities(String commonAmenities) {
		this.commonAmenities = commonAmenities;
	}

	public String getLicenseDetails() {
		return licenseDetails;
	}

	public void setLicenseDetails(String licenseDetails) {
		this.licenseDetails = licenseDetails;
	}

	public String getPropertyProofDetails() {
		return propertyProofDetails;
	}

	public void setPropertyProofDetails(String propertyProofDetails) {
		this.propertyProofDetails = propertyProofDetails;
	}

	public Double getStarRating() {
		return starRating;
	}

	public void setStarRating(Double starRating) {
		this.starRating = starRating;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getApprovedAt() {
		return approvedAt;
	}

	public void setApprovedAt(LocalDateTime approvedAt) {
		this.approvedAt = approvedAt;
	}

	public DeletionRequest getDeletionRequested() {
		return deletionRequested;
	}

	public void setDeletionRequested(DeletionRequest deletionRequested) {
		this.deletionRequested = deletionRequested;
	}

	public HotelType getType() {
		return type;
	}

	public void setType(HotelType type) {
		this.type = type;
	}

	public HotelStatus getStatus() {
		return status;
	}

	public void setStatus(HotelStatus status) {
		this.status = status;
	}

	public HotelAvailability getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(HotelAvailability isAvailable) {
		this.isAvailable = isAvailable;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(address, approvedAt, city, commonAmenities, contact, contactEmail, country, createdAt,
				deletionRequested, description, hotelOwner, id, imageUrls, isAvailable, licenseDetails, name,
				propertyProofDetails, starRating, state, status, type, zip);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Hotel other = (Hotel) obj;
		return Objects.equals(address, other.address) && Objects.equals(approvedAt, other.approvedAt)
				&& Objects.equals(city, other.city) && Objects.equals(commonAmenities, other.commonAmenities)
				&& Objects.equals(contact, other.contact) && Objects.equals(contactEmail, other.contactEmail)
				&& Objects.equals(country, other.country) && Objects.equals(createdAt, other.createdAt)
				&& deletionRequested == other.deletionRequested && Objects.equals(description, other.description)
				&& Objects.equals(hotelOwner, other.hotelOwner) && id == other.id
				&& Objects.equals(imageUrls, other.imageUrls) && isAvailable == other.isAvailable
				&& Objects.equals(licenseDetails, other.licenseDetails) && Objects.equals(name, other.name)
				&& Objects.equals(propertyProofDetails, other.propertyProofDetails)
				&& Objects.equals(starRating, other.starRating) && Objects.equals(state, other.state)
				&& status == other.status && type == other.type && Objects.equals(zip, other.zip);
	}

	

}
