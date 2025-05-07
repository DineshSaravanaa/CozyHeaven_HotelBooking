package com.hotelbooking.cozyheaven.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.cozyheaven.exception.InvalidIDException;
import com.hotelbooking.cozyheaven.model.VerificationRequest;
import com.hotelbooking.cozyheaven.service.VerificationRequestService;

@RestController
@RequestMapping("/api/verificationrequest")
public class VerificationRequestController {

    private static final Logger logger = LoggerFactory.getLogger(VerificationRequestController.class);

    @Autowired
    private VerificationRequestService verificationRequestService;

    // 1) To Verify request Hotel Owner
    @PostMapping("/add/{ownerId}")
    public VerificationRequest addRequestOwner(@PathVariable int ownerId, @RequestBody VerificationRequest request)
            throws InvalidIDException {
        logger.info("Received request to add verification for ownerId: {}", ownerId);
        try {
            VerificationRequest addedRequest = verificationRequestService.addVerificationRequestOwner(ownerId, request);
            logger.info("Successfully added verification request for ownerId: {}", ownerId);
            return addedRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid ownerId: {}", ownerId, e);
            throw e;
        }
    }

    // 2) To Approve Hotel Owner Verification
    @PutMapping("/approveOwner/{verificationid}")
    public VerificationRequest acceptRequestOwner(@PathVariable int verificationid) throws InvalidIDException {
        logger.info("Received request to approve verification with id: {}", verificationid);
        try {
            VerificationRequest approvedRequest = verificationRequestService.acceptRequestOwner(verificationid);
            logger.info("Successfully approved verification request with id: {}", verificationid);
            return approvedRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid verification ID: {}", verificationid, e);
            throw e;
        }
    }

    // 3) To Reject Hotel Owner Verification
    @PutMapping("/rejectOwner/{verificationid}")
    public VerificationRequest rejectRequestOwner(@PathVariable int verificationid) throws InvalidIDException {
        logger.info("Received request to reject verification with id: {}", verificationid);
        try {
            VerificationRequest rejectedRequest = verificationRequestService.rejectRequestOwner(verificationid);
            logger.info("Successfully rejected verification request with id: {}", verificationid);
            return rejectedRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid verification ID: {}", verificationid, e);
            throw e;
        }
    }

    // 4) To Request Verification For Hotel
    @PostMapping("/add1/{hotelId}")
    public VerificationRequest addRequest(@PathVariable int hotelId, @RequestBody VerificationRequest request)
            throws InvalidIDException {
        logger.info("Received request to add verification for hotelId: {}", hotelId);
        try {
            VerificationRequest addedRequest = verificationRequestService.addVerificationRequest(hotelId, request);
            logger.info("Successfully added verification request for hotelId: {}", hotelId);
            return addedRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid hotelId: {}", hotelId, e);
            throw e;
        }
    }

    // 5) To Approve Hotel Verification
    @PutMapping("/approveHotel/{verificationid}")
    public VerificationRequest acceptRequest(@PathVariable int verificationid) throws InvalidIDException {
        logger.info("Received request to approve hotel verification with id: {}", verificationid);
        try {
            VerificationRequest approvedRequest = verificationRequestService.acceptRequest(verificationid);
            logger.info("Successfully approved hotel verification request with id: {}", verificationid);
            return approvedRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid verification ID: {}", verificationid, e);
            throw e;
        }
    }

    // 6) To Reject Hotel Verification
    @PutMapping("/rejectHotel/{verificationid}")
    public VerificationRequest cancelRequest(@PathVariable int verificationid) throws InvalidIDException {
        logger.info("Received request to reject hotel verification with id: {}", verificationid);
        try {
            VerificationRequest cancelledRequest = verificationRequestService.cancelRequest(verificationid);
            logger.info("Successfully cancelled hotel verification request with id: {}", verificationid);
            return cancelledRequest;
        } catch (InvalidIDException e) {
            logger.error("Invalid verification ID: {}", verificationid, e);
            throw e;
        }
    }

    // Get a specific verification request by its ID
    @GetMapping("/get/{id}")
    public VerificationRequest getRequestById(@PathVariable int id) throws InvalidIDException {
        logger.info("Received request to fetch verification by id: {}", id);
        try {
            VerificationRequest request = verificationRequestService.getRequestById(id);
            logger.info("Successfully fetched verification request with id: {}", id);
            return request;
        } catch (InvalidIDException e) {
            logger.error("Invalid verification ID: {}", id, e);
            throw e;
        }
    }

    // Get Verification requests by hotelId
    @GetMapping("/getbyhotel/{hotelId}")
    public VerificationRequest getRequestsByHotel(@PathVariable int hotelId) throws InvalidIDException {
        logger.info("Received request to fetch verification by hotelId: {}", hotelId);
        try {
            VerificationRequest request = verificationRequestService.getRequestByHotel(hotelId);
            logger.info("Successfully fetched verification request for hotelId: {}", hotelId);
            return request;
        } catch (InvalidIDException e) {
            logger.error("Invalid hotel ID: {}", hotelId, e);
            throw e;
        }
    }

    // Showcase the verification request by its pending status
    @GetMapping("/pending")
    public List<VerificationRequest> getPendingRequests() {
        logger.info("Fetching pending verification requests.");
        List<VerificationRequest> pendingRequests = verificationRequestService.getPendingRequests();
        logger.info("Successfully fetched {} pending verification requests.", pendingRequests.size());
        return pendingRequests;
    }

    // Get Verification request by ownerId
    @GetMapping("/getbyowner/{ownerId}")
    public VerificationRequest getRequestsByOwner(@PathVariable int ownerId) throws InvalidIDException {
        logger.info("Received request to fetch verification by ownerId: {}", ownerId);
        try {
            VerificationRequest request = verificationRequestService.getRequestsByOwnerId(ownerId);
            logger.info("Successfully fetched verification request for ownerId: {}", ownerId);
            return request;
        } catch (InvalidIDException e) {
            logger.error("Invalid owner ID: {}", ownerId, e);
            throw e;
        }
    }

    // Get all verification requests
    @GetMapping("/all")
    public List<VerificationRequest> getAll() {
        logger.info("Fetching all verification requests.");
        List<VerificationRequest> allRequests = verificationRequestService.getAll();
        logger.info("Successfully fetched {} verification requests.", allRequests.size());
        return allRequests;
    }

    // Get pending counts
    @GetMapping("/pendingcount")
    public Long getByPendingCount() {
        logger.info("Fetching pending count of verification requests.");
        Long count = verificationRequestService.getByPendingCount();
        logger.info("Successfully fetched pending count: {}", count);
        return count;
    }

    // Get approved counts
    @GetMapping("/approvedcount")
    public Long getByApprovedCount() {
        logger.info("Fetching approved count of verification requests.");
        Long count = verificationRequestService.getByApprovedCount();
        logger.info("Successfully fetched approved count: {}", count);
        return count;
    }

    // Get cancelled counts
    @GetMapping("/cancelledcount")
    public Long getByCancelledCount() {
        logger.info("Fetching cancelled count of verification requests.");
        Long count = verificationRequestService.getByCancelledCount();
        logger.info("Successfully fetched cancelled count: {}", count);
        return count;
    }

    // Get approved list
    @GetMapping("/verifications/approved")
    public List<VerificationRequest> getApprovedVerifications() {
        logger.info("Fetching approved verification requests.");
        List<VerificationRequest> approvedVerifications = verificationRequestService.getApprovedVerifications();
        logger.info("Successfully fetched {} approved verification requests.", approvedVerifications.size());
        return approvedVerifications;
    }

    // Get cancelled list
    @GetMapping("/verifications/pending")
    public List<VerificationRequest> getPendingVerifications() {
        logger.info("Fetching pending verification requests.");
        List<VerificationRequest> pendingVerifications = verificationRequestService.getPendingVerifications();
        logger.info("Successfully fetched {} pending verification requests.", pendingVerifications.size());
        return pendingVerifications;
    }
}
