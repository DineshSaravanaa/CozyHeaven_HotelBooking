package com.hotelbooking.cozyheaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.cozyheaven.enums.ApprovalStatus;
import com.hotelbooking.cozyheaven.model.VerificationRequest;

public interface VerificationRequestRepository extends JpaRepository<VerificationRequest, Integer> {


	List<VerificationRequest> findByStatus(ApprovalStatus status);

	VerificationRequest findByHotelOwnerId(int ownerid);

	VerificationRequest findByHotelId(int hotelid);

}
